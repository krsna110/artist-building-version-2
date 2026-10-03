const fs = require('fs');
const path = require('path');

async function run() {
    const versionRes = await fetch('http://localhost:9222/json/version');
    const versionData = await versionRes.json();
    console.log('Connected to Chrome:', versionData.Browser);

    const listRes = await fetch('http://localhost:9222/json/new?http://localhost:8080/index.html');
    const pageData = await listRes.json();
    const wsUrl = pageData.webSocketDebuggerUrl;
    console.log('Page created:', wsUrl);

    const ws = new WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && callbacks.has(msg.id)) {
            callbacks.get(msg.id)(msg.result, msg.error);
            callbacks.delete(msg.id);
        }
    };

    function send(method, params = {}) {
        return new Promise((resolve, reject) => {
            const currentId = id++;
            callbacks.set(currentId, (res, err) => {
                if (err) reject(err);
                else resolve(res);
            });
            ws.send(JSON.stringify({ id: currentId, method, params }));
        });
    }

    await new Promise(r => ws.onopen = r);
    console.log('WebSocket connected');

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
    });

    // Wait 2 seconds for page resources to load
    await new Promise(r => setTimeout(r, 2000));

    // 1. Initial State Check (at top of page)
    const initialCheck = await send('Runtime.evaluate', {
        expression: `({
            scrollY: window.scrollY,
            stageClasses: document.getElementById('bonuses-stage').className,
            stackBtnActive: document.getElementById('btn-stack-view').classList.contains('active'),
            spreadBtnActive: document.getElementById('btn-spread-view').classList.contains('active')
        })`,
        returnByValue: true
    });
    console.log('1. Initial State (at top of page):', initialCheck.result.value);

    // 2. Scroll into #bonuses section
    console.log('Scrolling down to #bonuses...');
    await send('Runtime.evaluate', {
        expression: `document.getElementById('bonuses').scrollIntoView({ behavior: 'smooth', block: 'center' })`
    });

    // Wait 1.2 seconds for smooth scroll and bloom animation
    await new Promise(r => setTimeout(r, 1200));

    const afterScrollCheck = await send('Runtime.evaluate', {
        expression: `({
            scrollY: window.scrollY,
            stageClasses: document.getElementById('bonuses-stage').className,
            stackBtnActive: document.getElementById('btn-stack-view').classList.contains('active'),
            spreadBtnActive: document.getElementById('btn-spread-view').classList.contains('active'),
            card0Transform: window.getComputedStyle(document.querySelector('.bonus-card[data-card-index="0"]')).transform,
            card1Transform: window.getComputedStyle(document.querySelector('.bonus-card[data-card-index="1"]')).transform,
            card2Transform: window.getComputedStyle(document.querySelector('.bonus-card[data-card-index="2"]')).transform
        })`,
        returnByValue: true
    });
    console.log('2. State After Scroll into #bonuses:', afterScrollCheck.result.value);

    // Capture screenshot of spread view
    const ssSpread = await send('Page.captureScreenshot', { format: 'png' });
    const spreadPath = path.join(__dirname, 'screenshot-spread-scroll.png');
    fs.writeFileSync(spreadPath, Buffer.from(ssSpread.data, 'base64'));
    console.log('Spread view screenshot saved to:', spreadPath);

    // 3. Test Manual Toggle to Deck View
    console.log('Clicking Deck View button...');
    await send('Runtime.evaluate', {
        expression: `document.getElementById('btn-stack-view').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    const afterDeckClick = await send('Runtime.evaluate', {
        expression: `({
            stageClasses: document.getElementById('bonuses-stage').className,
            stackBtnActive: document.getElementById('btn-stack-view').classList.contains('active'),
            spreadBtnActive: document.getElementById('btn-spread-view').classList.contains('active')
        })`,
        returnByValue: true
    });
    console.log('3. State After Clicking Deck View:', afterDeckClick.result.value);

    const ssDeck = await send('Page.captureScreenshot', { format: 'png' });
    const deckPath = path.join(__dirname, 'screenshot-deck-manual.png');
    fs.writeFileSync(deckPath, Buffer.from(ssDeck.data, 'base64'));
    console.log('Deck view screenshot saved to:', deckPath);

    // Close page
    await fetch(`http://localhost:9222/json/close/${pageData.id}`);
    ws.close();
    console.log('Verification completed successfully!');
}

run().catch(err => {
    console.error('Test error:', err);
    process.exit(1);
});
