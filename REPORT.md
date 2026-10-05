# Performance & Video Delivery Data Collection Report
**Target URL:** `https://krsna110.github.io/artist-building-version-2/`  
**Target Repository:** `c:\Users\krish\OneDrive\Pictures\artist-building-version-2-card-swipe-only\artist-building-version-2-main`  
**Execution Timestamp:** 2026-10-04  
**Audit Rule:** Strictly read-only data collection, zero file mutations, measured browser data.

---

## 1. Verified Results (with Raw Evidence)

### 1. CODE EXTRACT (Exact Copy-Paste with File Paths and Line Numbers)

#### a. HTML Markup of Every `<video>` Element

**File:** `index.html`

* **Hero / About Section (No video element present, placeholder markup):**
  * `index.html:94-100`:
  ```html
  <div class="video-player" id="video-player">
      <div class="video-placeholder">
          <div class="play-button" id="play-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
      </div>
  </div>
  ```

* **Module / Skill Outcome Cards (`.skills-stack .skill-card`):**
  * Card 1 (`index.html:245-248`):
  ```html
  <div class="skill-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/1Visual%20storytelling%20.mp4" data-title="Visual Storytelling" data-tag="Cinematic Narrative & Mood" tabindex="0" role="button" aria-label="Play Visual Storytelling reel">
      <div class="skill-card-bg">
          <video class="skill-video-bg" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/1Visual%20storytelling%20.mp4" autoplay muted loop playsinline preload="none" poster="assets/visual-storytelling.webp"></video>
      </div>
  ```
  * Card 2 (`index.html:269-272`): Static image card (`data-video-src=""`, no `<video>` tag).
  * Card 3 (`index.html:293-296`):
  ```html
  <div class="skill-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/3reels%20%26%20YOUTUBE%20SHORTS%20EDITING%20.mp4" data-title="Reels & Shorts" data-tag="Vertical Video & Hook Timing" tabindex="0" role="button" aria-label="Play Reels & Shorts reel">
      <div class="skill-card-bg">
          <video class="skill-video-bg" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/3reels%20%26%20YOUTUBE%20SHORTS%20EDITING%20.mp4" autoplay muted loop playsinline preload="none" poster="assets/reels-shorts-editing.webp"></video>
      </div>
  ```
  * Card 4 (`index.html:317-320`):
  ```html
  <div class="skill-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/4UGC%20ads%20editing.mp4" data-title="UGC Ads" data-tag="Conversion & Commercial Edits" tabindex="0" role="button" aria-label="Play UGC Ads reel">
      <div class="skill-card-bg">
          <video class="skill-video-bg" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/4UGC%20ads%20editing.mp4" autoplay muted loop playsinline preload="none" poster="assets/ugc-ads-editing.webp"></video>
      </div>
  ```
  * Card 5 (`index.html:341-344`): Static image card (`data-video-src=""`, no `<video>` tag).
  * Card 6 (`index.html:365-368`):
  ```html
  <div class="skill-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/6%20Podcast%20edit%20.mp4" data-title="Podcast Editing" data-tag="Multi-Cam Sync & Audio Cleanup" tabindex="0" role="button" aria-label="Play Podcast Editing reel">
      <div class="skill-card-bg">
          <video class="skill-video-bg" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/6%20Podcast%20edit%20.mp4" autoplay muted loop playsinline preload="none" poster="assets/podcast-editing.webp"></video>
      </div>
  ```
  * Card 7 (`index.html:389-392`):
  ```html
  <div class="skill-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/7typography%20animation%20mp4.mp4" data-title="Typography Animation" data-tag="Kinetic Type & Lower Thirds" tabindex="0" role="button" aria-label="Play Typography Animation reel">
      <div class="skill-card-bg">
          <video class="skill-video-bg" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/7typography%20animation%20mp4.mp4" autoplay muted loop playsinline preload="none"></video>
      </div>
  ```
  * Card 8 (`index.html:413-416`):
  ```html
  <div class="skill-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/8motion%20graphcs.mp4" data-title="Motion Graphics" data-tag="Shape Layers & Keyframe Curves" tabindex="0" role="button" aria-label="Play Motion Graphics reel">
      <div class="skill-card-bg">
          <video class="skill-video-bg" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/8motion%20graphcs.mp4" autoplay muted loop playsinline preload="none"></video>
      </div>
  ```
  * Card 9 (`index.html:437-440`):
  ```html
  <div class="skill-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/9%2C%202d%20animation.mp4" data-title="2D Animation" data-tag="Principles & Rigging Basics" tabindex="0" role="button" aria-label="Play 2D Animation reel">
      <div class="skill-card-bg">
          <video class="skill-video-bg" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/9%2C%202d%20animation.mp4" autoplay muted loop playsinline preload="none"></video>
      </div>
  ```

* **Student Works (`.project-cards .project-card`):**
  * Project 1 (`index.html:479-482`):
  ```html
  <div class="project-card" id="project-1" role="button" tabindex="0" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/Comp%201_2.mp4" data-title="Match Cut Project" data-tag="Student Work" aria-label="Play Match Cut Project">
      <div class="project-thumb project-thumb-1">
          <video class="project-card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/Comp%201_2.mp4" autoplay muted loop playsinline preload="none"></video>
  ```
  * Project 2 (`index.html:490-493`):
  ```html
  <div class="project-card" id="project-2" role="button" tabindex="0" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/Wifi%20original.mp4" data-title="Commercial Ad Edit" data-tag="Student Work" aria-label="Play Commercial Ad Edit">
      <div class="project-thumb project-thumb-2">
          <video class="project-card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/Wifi%20original.mp4" autoplay muted loop playsinline preload="none"></video>
  ```
  * Project 3 (`index.html:501-504`):
  ```html
  <div class="project-card" id="project-3" role="button" tabindex="0" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/gun.mp4" data-title="Action VFX & Sound Design" data-tag="Student Work" aria-label="Play Action VFX & Sound Design">
      <div class="project-thumb project-thumb-3">
          <video class="project-card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/gun.mp4" autoplay muted loop playsinline preload="none"></video>
  ```
  * Project 4 (`index.html:512-515`):
  ```html
  <div class="project-card" id="project-4" role="button" tabindex="0" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/krishna.mp4" data-title="Cinematic Storytelling" data-tag="Student Work" aria-label="Play Cinematic Storytelling">
      <div class="project-thumb project-thumb-4">
          <video class="project-card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/krishna.mp4" autoplay muted loop playsinline preload="none"></video>
  ```
  * Project 5 (`index.html:523-526`):
  ```html
  <div class="project-card" id="project-5" role="button" tabindex="0" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/main%20video%20001.mp4" data-title="Movie Trailer Project" data-tag="Student Work" aria-label="Play Movie Trailer Project">
      <div class="project-thumb project-thumb-5">
          <video class="project-card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/main%20video%20001.mp4" autoplay muted loop playsinline preload="none"></video>
  ```
  * Project 6 (`index.html:534-537`):
  ```html
  <div class="project-card" id="project-6" role="button" tabindex="0" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/premiere%20pro%20edit.mp4" data-title="Premiere Pro Edit Project" data-tag="Student Work" aria-label="Play Premiere Pro Edit Project">
      <div class="project-thumb project-thumb-6">
          <video class="project-card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/premiere%20pro%20edit.mp4" autoplay muted loop playsinline preload="none"></video>
  ```
  * Project 7 (`index.html:545-548`):
  ```html
  <div class="project-card" id="project-7" role="button" tabindex="0" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/render%202.mp4" data-title="3D Motion & Render Project" data-tag="Student Work" aria-label="Play 3D Motion & Render Project">
      <div class="project-thumb project-thumb-7">
          <video class="project-card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/render%202.mp4" autoplay muted loop playsinline preload="none"></video>
  ```
  * Project 8 (`index.html:556-559`):
  ```html
  <div class="project-card" id="project-8" role="button" tabindex="0" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/wifi%20motion.mp4" data-title="Speed Ramping & Motion" data-tag="Student Work" aria-label="Play Speed Ramping & Motion">
      <div class="project-thumb project-thumb-8">
          <video class="project-card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/wifi%20motion.mp4" autoplay muted loop playsinline preload="none"></video>
  ```

* **Testimonial Marquee (`.testimonials-track .testimonial-card`):**
  * Group 1 (`index.html:927-950`):
  ```html
  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_1.mp4" tabindex="0" role="button" aria-label="Play Student Testimonial 1">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_1.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_2.mp4" tabindex="0" role="button" aria-label="Play Student Testimonial 2">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_2.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_3.mp4" tabindex="0" role="button" aria-label="Play Student Testimonial 3">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_3.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_4.mp4" tabindex="0" role="button" aria-label="Play Student Testimonial 4">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_4.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_5.mp4" tabindex="0" role="button" aria-label="Play Student Testimonial 5">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_5.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_6.mp4" tabindex="0" role="button" aria-label="Play Student Testimonial 6">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_6.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>
  ```
  * Group 2 Duplicate (`index.html:954-977`):
  ```html
  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_1.mp4" tabindex="-1">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_1.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_2.mp4" tabindex="-1">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_2.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_3.mp4" tabindex="-1">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_3.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_4.mp4" tabindex="-1">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_4.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_5.mp4" tabindex="-1">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_5.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>

  <article class="testimonial-card" data-video-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_6.mp4" tabindex="-1">
      <video class="card-video" data-src="https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_6.mp4" autoplay muted loop playsinline preload="none"></video>
  </article>
  ```

* **Modal Video Player (`#modal-video-player`):**
  * `index.html:1169`:
  ```html
  <video id="modal-video-player" class="testimonial-modal-video" controls playsinline preload="auto"></video>
  ```

---

#### b. Full IntersectionObserver Code

**File:** `script.js:634-674`
```javascript
    // Proximity observer: lazily loads MP4 streams only when card approaches viewport (300px buffer)
    let preloadObserver = null;
    let playbackObserver = null;

    if ('IntersectionObserver' in window) {
        preloadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target.querySelector('video');
                    if (video) {
                        loadCardVideo(video);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '350px 0px 350px 0px',
            threshold: 0.01
        });

        playbackObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                const video = card.querySelector('video');
                if (!video) return;

                if (entry.isIntersecting) {
                    intersectingCards.add(card);
                    loadCardVideo(video);
                    safePlayVideo(video);
                } else {
                    intersectingCards.delete(card);
                    safePauseVideo(video);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px 0px 0px'
        });
    }
```
* **Configuration:**
  * `preloadObserver`: `rootMargin: '350px 0px 350px 0px'`, `threshold: 0.01`.
  * `playbackObserver`: `rootMargin: '0px 0px 0px 0px'`, `threshold: 0.15`.
  * **`unobserve()` Status:** **YES**, `observer.unobserve(entry.target)` is explicitly called on line 645 once the source is attached in `preloadObserver`.

---

#### c. Modal Open/Close JS, `visibilitychange` Handler, and `play()`/`pause()` Calls

**File:** `script.js:605-632, 710-784`

```javascript
    function safePlayVideo(video) {
        if (!video || !video.src || isModalOpen || document.hidden) return;
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked or interrupted gracefully
            });
        }
    }

    function safePauseVideo(video) {
        if (!video) return;
        try {
            if (!video.paused) {
                video.pause();
            }
        } catch (_) {}
    }

    function loadCardVideo(video) {
        if (!video) return;
        if (video.dataset && video.dataset.src && !video.src) {
            video.src = video.dataset.src;
            video.preload = 'metadata';
            video.load();
        }
    }
```

* **`visibilitychange` Handler (`script.js:710-726`):**
```javascript
    // Pause all background video streams when user navigates away from tab
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            intersectingCards.forEach(card => {
                const video = card.querySelector('video');
                safePauseVideo(video);
            });
            if (modalVideo && !modalVideo.paused) {
                safePauseVideo(modalVideo);
            }
        } else if (!isModalOpen) {
            intersectingCards.forEach(card => {
                const video = card.querySelector('video');
                safePlayVideo(video);
            });
        }
    });
```

* **Modal Open / Close Coordinator (`script.js:729-784`):**
```javascript
    // === Video Reel Modal Coordinator ===
    function openVideoModal(card) {
        if (!testimonialModal || !modalVideo) return;
        isModalOpen = true;

        // Pause all background video loops to allocate maximum bandwidth & GPU to the modal player
        intersectingCards.forEach(c => {
            const video = c.querySelector('video');
            safePauseVideo(video);
        });

        const videoSrc = card.dataset.videoSrc || '';
        const title = card.dataset.title || card.dataset.student || 'Video Reel';
        const role = card.dataset.tag || card.dataset.role || '';
        const poster = card.dataset.poster || '';

        if (modalStudentName) modalStudentName.textContent = title;
        if (modalStudentRole) modalStudentRole.textContent = role;

        if (videoSrc.trim()) {
            if (modalNotice) modalNotice.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.poster = poster;
            modalVideo.src = videoSrc;
            modalVideo.currentTime = 0;
            const modalPlayPromise = modalVideo.play();
            if (modalPlayPromise !== undefined) {
                modalPlayPromise.catch(() => {});
            }
        } else {
            // Placeholder notice if videoSrc is blank
            modalVideo.pause();
            modalVideo.removeAttribute('src');
            modalVideo.style.display = 'none';
            if (modalNotice) {
                modalNotice.style.display = 'flex';
                if (noticeTitle) noticeTitle.textContent = `${title} Reel`;
                const noticeDesc = document.getElementById('notice-desc');
                if (noticeDesc) noticeDesc.innerHTML = `Video reel coming soon! Set <code>data-video-src</code> on this card.`;
            }
        }

        testimonialModal.classList.add('active');
        testimonialModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!testimonialModal || !modalVideo) return;
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.load();
        testimonialModal.classList.remove('active');
        testimonialModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        // Resume playback for in-view background videos
        if (!document.hidden) {
            intersectingCards.forEach(card => {
                const video = card.querySelector('video');
                safePlayVideo(video);
            });
        }
    }
```
* **`play()` Promise Rejection Handling:** **YES**, all `video.play()` invocations (in `safePlayVideo` and `openVideoModal`) test whether `playPromise !== undefined` and attach `.catch(() => {})` to swallow rejection cleanly without console exceptions.

---

#### d. Testimonial Marquee Structure
* **Nature of Duplicate Cards:** The duplicates in Group 2 are **static HTML** hardcoded in `index.html` (lines 953–978) to support seamless CSS keyframe marquee animation (`@keyframes testimonials-scroll`).
* **Source Attachment:** All 12 cards have `data-src="..."` and `preload="none"`. A card only receives an active `.src` attribute when that specific card intersects within the `350px` proximity buffer of the browser viewport.

---

### 2. NETWORK TEST (Playwright, Headless Chromium, Cache Disabled, Slow 4G Throttling)

#### Test Profile 1: Desktop (1366x768, Slow 4G)
* **Target:** `https://krsna110.github.io/artist-building-version-2/`
* **Throttling:** Slow 4G (1.6 Mbps download, 750 kbps upload, 150ms RTT latency).

* **a. After Page Load WITHOUT Scrolling:**
  * **Media (.mp4) Requests:** **0**
  * **Media Bytes Transferred:** **0 Bytes**
  * Raw observation: `Total Requests: 21 | Media Requests: 0`

* **b. Section-by-Section Cumulative Media Requests (CDP Measured):**

| Section Scrolled Into | Viewport Section ID | New Media Requests | Request URL & Range Header | Transferred Media Bytes (Wire) |
| :--- | :--- | :--- | :--- | :--- |
| **Hero** | `#hero` | 0 | None | 0 B |
| **About Us** | `#about` | 0 | None | 0 B |
| **Video Placeholder** | `#video-section` | 0 | None | 0 B |
| **Mentors** | `#mentors` | 0 | None | 0 B |
| **Skill Outcomes** | `#skills-stack` | 4 | `1Visual storytelling .mp4` (bytes=0-)<br>`3reels & YOUTUBE SHORTS EDITING .mp4` (bytes=0-)<br>`4UGC ads editing.mp4` (bytes=0-)<br>`6 Podcast edit .mp4` (bytes=0-) | ~67.2 KB (initial metadata ranges) |
| **Student Projects** | `#projects` | 5 | `Comp 1_2.mp4` (bytes=0-)<br>`Wifi original.mp4` (bytes=0-)<br>`gun.mp4` (bytes=0-)<br>`4UGC ads editing.mp4` (range chunk)<br>`6 Podcast edit .mp4` (range chunk) | ~63.0 KB |
| **Curriculum** | `#curriculum` | 0 | None | 0 B |
| **Bonuses** | `#bonuses` | 0 | None | 0 B |
| **Testimonials** | `#testimonials` | 0 | None (Approached at next section) | 0 B |
| **FAQ** | `#faq` | 0 | None | 0 B |
| **Pricing** | `#pricing` | 7 | `Testimonial_1.mp4` to `Testimonial_6.mp4` (proximity triggered) | ~1.09 MB |

* **c. Duplicate Testimonial Request Counts (Desktop):**
  * `Testimonial_1.mp4`: **1 request**
  * `Testimonial_2.mp4`: **1 request**
  * `Testimonial_3.mp4`: **1 request**
  * `Testimonial_4.mp4`: **2 requests** (initial header range + buffer chunk)
  * `Testimonial_5.mp4`: **1 request**
  * `Testimonial_6.mp4`: **1 request**
  * Total Testimonial Requests: **7 requests** (Duplicated Group 2 cards not scrolled into viewport did not trigger redundant full streams).

* **d. Total Measured Bytes (Desktop):**
  * **Total Page Transferred Bytes:** **10,302,873 bytes (9.83 MB)** (Includes HTML, CSS, fonts, uncompressed high-res webp/png assets, and stream chunks)
  * **Total Media Transferred Bytes:** **1,224,281 bytes (1.17 MB)**
  * **Non-Media Transferred Bytes:** **9,078,592 bytes (8.66 MB)**

---

#### Test Profile 2: Mobile (Pixel 7 Emulation: 412x915, DPR 2.625, Slow 4G)

* **a. After Page Load WITHOUT Scrolling:**
  * **Media (.mp4) Requests:** **0**
  * **Media Bytes Transferred:** **0 Bytes**

* **b. Section-by-Section Cumulative Media Requests (CDP Measured):**

| Section Scrolled Into | Viewport Section ID | New Media Requests | Request URL & Range Header | Transferred Media Bytes (Wire) |
| :--- | :--- | :--- | :--- | :--- |
| **Hero** | `#hero` | 0 | None | 0 B |
| **About Us** | `#about` | 0 | None | 0 B |
| **Video Placeholder** | `#video-section` | 0 | None | 0 B |
| **Mentors** | `#mentors` | 0 | None | 0 B |
| **Skill Outcomes** | `#skills-stack` | 4 | `1Visual storytelling .mp4` (bytes=0-)<br>`3reels & YOUTUBE SHORTS EDITING .mp4` (bytes=0-)<br>`4UGC ads editing.mp4` (bytes=0-)<br>`6 Podcast edit .mp4` (bytes=0-) | ~67.2 KB |
| **Student Projects** | `#projects` | 5 | `Comp 1_2.mp4` (bytes=0-)<br>`7typography animation mp4.mp4` (bytes=0-)<br>`8motion graphcs.mp4` (bytes=0-)<br>`9, 2d animation.mp4` (bytes=0-)<br>`4UGC ads editing.mp4` (range chunk) | ~55.0 KB |
| **Curriculum** | `#curriculum` | 1 | `6 Podcast edit .mp4` (range chunk) | 0 B (pending) |
| **Bonuses** | `#bonuses` | 0 | None | 0 B |
| **Testimonials** | `#testimonials` | 0 | None | 0 B |
| **FAQ** | `#faq` | 0 | None | 0 B |
| **Pricing** | `#pricing` | 3 | `Testimonial_4.mp4`, `Testimonial_5.mp4`, `Testimonial_6.mp4` | ~1.17 MB |

* **c. Duplicate Testimonial Request Counts (Mobile):**
  * `Testimonial_4.mp4`: **1 request**
  * `Testimonial_5.mp4`: **1 request**
  * `Testimonial_6.mp4`: **1 request**
  * `Testimonial_1.mp4`, `2`, `3`: **0 requests** (were off-screen on mobile carousel position)

* **d. Total Measured Bytes (Mobile):**
  * **Total Page Transferred Bytes:** **6,957,803 bytes (6.64 MB)**
  * **Total Media Transferred Bytes:** **1,297,525 bytes (1.24 MB)**
  * **Non-Media Transferred Bytes:** **5,660,278 bytes (5.40 MB)**

---

### 3. BEHAVIOUR TEST (Playwright Automated Protocol Run)

All behaviour tests were executed against `https://krsna110.github.io/artist-building-version-2/`:

```json
{
  "test1_viewportPlayPause": {
    "onScreenState": {
      "src": "https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/1Visual%20storytelling%20.mp4",
      "paused": false,
      "currentTime": 0
    },
    "offScreenState": {
      "paused": true,
      "currentTime": 0
    },
    "resumedState": {
      "paused": false,
      "currentTime": 0.568
    },
    "result": "PASSED"
  },
  "test2_modalOpen": {
    "modalActive": true,
    "modalVideoSrc": "https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/1Visual%20storytelling%20.mp4",
    "modalVideoPaused": false,
    "modalVideoCurrentTime": 0.559,
    "allBackgroundVideosPaused": true,
    "bgVideosCount": 27,
    "result": "PASSED"
  },
  "test3_modalClose": {
    "modalActive": false,
    "modalVideoCleaned": true,
    "visibleSkillVideoPaused": false,
    "offscreenVideosPaused": true,
    "result": "PASSED"
  },
  "test4_tabVisibility": {
    "allPausedWhenHidden": true,
    "visibleVideoResumedWhenActive": true,
    "result": "PASSED"
  },
  "test5_autoplayRejection": {
    "rejectionCaughtGracefully": true,
    "uncaughtExceptionThrown": false,
    "uiIntact": true,
    "result": "PASSED"
  },
  "test6_networkFailureAndSeeking": {
    "blockedStreamCardRendered": true,
    "blockedStreamVideoOpacity": "0",
    "pageBroken": false,
    "modalSeekingTarget": 2.5,
    "modalActualSeekedTime": 2.5,
    "seekingSuccessful": true,
    "result": "PASSED"
  }
}
```

* **Summary of Behaviour Verifications:**
  1. Off-screen videos pause immediately; on-screen videos resume playback seamlessly.
  2. Opening the modal immediately pauses all 27 background video elements, dedicating full bandwidth to `#modal-video-player`.
  3. Closing the modal unloads the modal player and only resumes background videos intersecting the current viewport.
  4. Tab switching (`visibilitychange`) automatically pauses all media streams and resumes visible ones on tab return.
  5. Forcing autoplay rejection (`NotAllowedError`) does not throw unhandled exceptions or crash the UI.
  6. Aborting/blocking a stream URL hides the broken video without breaking layout, and scrubbing/seeking to `2.5s` on modal video works cleanly (`status 206 Partial Content`).

---

### 4. CORE WEB VITALS (Lab Data vs Field Data)

#### Lab Data (Lighthouse 3-Run Median Measurements)

* **Mobile (3 Runs):**
  * Run 1: Score 46 | LCP: 6.42s | CLS: 0.000 | TBT: 880ms
  * Run 2: Score 49 | LCP: 6.45s | CLS: 0.020 | TBT: 771ms
  * Run 3: Score 46 | LCP: 6.41s | CLS: 0.002 | TBT: 714ms
  * **Median Mobile LCP:** **6.42 s**
  * **Median Mobile CLS:** **0.002** (Good: < 0.1)
  * **Median Mobile TBT:** **771 ms**
  * **LCP Element:** `<h1 class="hero-title">Learn to cut, grade and animate like a professional editor.</h1>` (Selector: `body > section#hero > div.hero-content > h1.hero-title`)

* **Desktop (3 Runs):**
  * Run 1: Score 84 | LCP: 1.87s | CLS: 0.003 | TBT: 4ms
  * Run 2: Score 88 | LCP: 1.64s | CLS: 0.003 | TBT: 0ms
  * Run 3: Score 91 | LCP: 1.51s | CLS: 0.003 | TBT: 0ms
  * **Median Desktop LCP:** **1.64 s** (Good: < 2.5s)
  * **Median Desktop CLS:** **0.003** (Good: < 0.1)
  * **Median Desktop TBT:** **0 ms** (Good: < 200ms)
  * **LCP Element:** `<h1 class="hero-title">Learn to cut, grade and animate like a professional editor.</h1>` (Selector: `body > section#hero > div.hero-content > h1.hero-title`)

* **INP (Interaction to Next Paint - Playwright PerformanceObserver Interaction Test):**
  * Measured Interactions (Click CTA, Scroll, Open Modal, Close Modal): 11 interaction events recorded.
  * Maximum Interaction Duration: **728 ms** (pointerdown/click event dispatch during heavy scroll stacking animation).
  * Status: **NEEDS IMPROVEMENT (> 200ms)**

#### Field Data (CrUX / Real User Monitoring)
* Query to PageSpeed Insights / Chrome UX Report API for `https://krsna110.github.io/artist-building-version-2/`:
* Result: **NO FIELD DATA** (Page does not have sufficient historical real-user traffic in the CrUX dataset).

---

### 5. CLOUDFLARE R2 HEADERS (Real `curl.exe` Output)

Tested across 3 distinct video categories:

#### Video 1: Module / Skill Reel (`1Visual storytelling .mp4`)
```http
--- 1. curl.exe -sI "https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/1Visual%20storytelling%20.mp4" ---
HTTP/1.1 200 OK
Date: Sun, 04 Oct 2026 10:17:42 GMT
Content-Type: video/mp4
Content-Length: 36309638
Connection: keep-alive
Accept-Ranges: bytes
ETag: "61d0621882be0f7c1f2582fab6653c0d"
Last-Modified: Fri, 02 Oct 2026 10:20:34 GMT
Server: cloudflare
CF-RAY: a45370361884a0b7-MRS

--- 2. curl.exe -sI -H "Range: bytes=0-1023" (Call 1) ---
HTTP/1.1 206 Partial Content
Date: Sun, 04 Oct 2026 10:17:43 GMT
Content-Type: video/mp4
Content-Length: 1024
Connection: keep-alive
Content-Range: bytes 0-1023/36309638
Accept-Ranges: bytes
ETag: "61d0621882be0f7c1f2582fab6653c0d"
Last-Modified: Fri, 02 Oct 2026 10:20:34 GMT
Server: cloudflare
CF-RAY: a453703d4cf011a1-MRS

--- 3. curl.exe -sI -H "Range: bytes=0-1023" (Call 2 - Cache Check) ---
HTTP/1.1 206 Partial Content
Date: Sun, 04 Oct 2026 10:17:44 GMT
Content-Type: video/mp4
Content-Length: 1024
Connection: keep-alive
Content-Range: bytes 0-1023/36309638
Accept-Ranges: bytes
ETag: "61d0621882be0f7c1f2582fab6653c0d"
Last-Modified: Fri, 02 Oct 2026 10:20:34 GMT
Server: cloudflare
CF-RAY: a4537043685be15a-MRS
```

#### Video 2: Student Work (`Comp 1_2.mp4`)
```http
--- 1. curl.exe -sI "https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/Comp%201_2.mp4" ---
HTTP/1.1 200 OK
Date: Sun, 04 Oct 2026 10:17:45 GMT
Content-Type: video/mp4
Content-Length: 6812811
Connection: keep-alive
Accept-Ranges: bytes
ETag: "12eb6865146ca0a951fd9010dba40f76"
Last-Modified: Sat, 03 Oct 2026 15:35:11 GMT
Server: cloudflare
CF-RAY: a453704a5dc7e1b0-MRS

--- 2. curl.exe -sI -H "Range: bytes=0-1023" (Call 1) ---
HTTP/1.1 206 Partial Content
Date: Sun, 04 Oct 2026 10:17:46 GMT
Content-Type: video/mp4
Content-Length: 1024
Connection: keep-alive
Content-Range: bytes 0-1023/6812811
Accept-Ranges: bytes
ETag: "12eb6865146ca0a951fd9010dba40f76"
Last-Modified: Sat, 03 Oct 2026 15:35:11 GMT
Server: cloudflare
CF-RAY: a4537050eb289b0d-MRS

--- 3. curl.exe -sI -H "Range: bytes=0-1023" (Call 2 - Cache Check) ---
HTTP/1.1 206 Partial Content
Date: Sun, 04 Oct 2026 10:17:47 GMT
Content-Type: video/mp4
Content-Length: 1024
Connection: keep-alive
Content-Range: bytes 0-1023/6812811
Accept-Ranges: bytes
ETag: "12eb6865146ca0a951fd9010dba40f76"
Last-Modified: Sat, 03 Oct 2026 15:35:11 GMT
Server: cloudflare
CF-RAY: a4537057bb83e167-MRS
```

#### Video 3: Student Testimonial (`Testimonial_1.mp4`)
```http
--- 1. curl.exe -sI "https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_1.mp4" ---
HTTP/1.1 200 OK
Date: Sun, 04 Oct 2026 10:17:49 GMT
Content-Type: video/mp4
Content-Length: 108871606
Connection: keep-alive
Accept-Ranges: bytes
ETag: "c99d4eb12032f155e773e45b9ad3ba60"
Last-Modified: Fri, 02 Oct 2026 12:14:07 GMT
Server: cloudflare
CF-RAY: a4537060dead3169-MRS

--- 2. curl.exe -sI -H "Range: bytes=0-1023" (Call 1) ---
HTTP/1.1 206 Partial Content
Date: Sun, 04 Oct 2026 10:17:50 GMT
Content-Type: video/mp4
Content-Length: 1024
Connection: keep-alive
Content-Range: bytes 0-1023/108871606
Accept-Ranges: bytes
ETag: "c99d4eb12032f155e773e45b9ad3ba60"
Last-Modified: Fri, 02 Oct 2026 12:14:07 GMT
Server: cloudflare
CF-RAY: a45370688e3f3d46-MRS

--- 3. curl.exe -sI -H "Range: bytes=0-1023" (Call 2 - Cache Check) ---
HTTP/1.1 206 Partial Content
Date: Sun, 04 Oct 2026 10:17:51 GMT
Content-Type: video/mp4
Content-Length: 1024
Connection: keep-alive
Content-Range: bytes 0-1023/108871606
Accept-Ranges: bytes
ETag: "c99d4eb12032f155e773e45b9ad3ba60"
Last-Modified: Fri, 02 Oct 2026 12:14:07 GMT
Server: cloudflare
CF-RAY: a45370708872ac32-MRS
```

* **Cloudflare Header Summary:**
  * **Status:** `200 OK` (full resource) / `206 Partial Content` (range request).
  * **Content-Type:** `video/mp4`
  * **Accept-Ranges:** `bytes`
  * **Content-Range:** `bytes 0-1023/<filesize>`
  * **Cache-Control:** **NONE** (Header is omitted by Cloudflare R2 on default r2.dev subdomain).
  * **CF-Cache-Status:** **NONE** (Header is absent because caching is bypassed on r2.dev origin bucket subdomains).
  * **Server:** `cloudflare`
  * **Domain Type:** **Served from default `r2.dev` bucket subdomain** (`pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev`), **NOT a custom domain**.

---

### 6. VIDEO FILE INFO (Read-Only `ffprobe` & Byte Slice Probe)

| Video Filename | URL | Size (MB) | Resolution | Codec | Bitrate | Duration | Faststart (moov at start) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1Visual storytelling .mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/1Visual%20storytelling%20.mp4) | 34.63 MB | 1080x1920 | h264 | 30,706 kbps | 9.46s | **yes** |
| `3reels & YOUTUBE SHORTS EDITING .mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/3reels%20%26%20YOUTUBE%20SHORTS%20EDITING%20.mp4) | 34.94 MB | 1080x1920 | h264 | 30,979 kbps | 9.46s | **yes** |
| `4UGC ads editing.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/4UGC%20ads%20editing.mp4) | 221.41 MB | 1080x1920 | h264 | 32,380 kbps | 57.36s | **yes** |
| `6 Podcast edit .mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/6%20Podcast%20edit%20.mp4) | 235.12 MB | 1920x1080 | h264 | 19,625 kbps | 100.50s | **yes** |
| `7typography animation mp4.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/7typography%20animation%20mp4.mp4) | 13.56 MB | 1080x1920 | h264 | 23,496 kbps | 4.84s | **yes** |
| `8motion graphcs.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/8motion%20graphcs.mp4) | 8.63 MB | 1080x1920 | h264 | 14,714 kbps | 4.92s | **yes** |
| `9, 2d animation.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/9%20-%20reels/9%2C%202d%20animation.mp4) | 102.89 MB | 1080x1350 | h264 | 38,879 kbps | 22.20s | **yes** |
| `Comp 1_2.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/Comp%201_2.mp4) | 6.50 MB | 1920x1080 | h264 | 13,740 kbps | 3.97s | **yes** |
| `Wifi original.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/Wifi%20original.mp4) | 1.85 MB | 1920x1080 | h264 | 1,938 kbps | 8.00s | **yes** |
| `gun.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/gun.mp4) | 3.04 MB | 1920x1080 | h264 | 3,785 kbps | 6.73s | **yes** |
| `krishna.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/krishna.mp4) | 15.58 MB | 1920x1080 | h264 | 16,332 kbps | 8.00s | **yes** |
| `main video 001.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/main%20video%20001.mp4) | 12.72 MB | 720x1280 | h264 | 5,220 kbps | 20.43s | **yes** |
| `premiere pro edit.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/premiere%20pro%20edit.mp4) | 1.55 MB | 478x850 | h264 | 1,118 kbps | 11.61s | **yes** |
| `render 2.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/render%202.mp4) | 13.45 MB | 1080x1920 | h264 | 5,639 kbps | 20.00s | **yes** |
| `wifi motion.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20%20works/wifi%20motion.mp4) | 1.76 MB | 1920x1080 | h264 | 1,850 kbps | 8.00s | **yes** |
| `Testimonial_1.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_1.mp4) | 103.83 MB | 1080x1920 | h264 | 33,759 kbps | 25.80s | **yes** |
| `Testimonial_2.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_2.mp4) | 154.98 MB | 1080x1920 | h264 | 33,857 kbps | 38.40s | **yes** |
| `Testimonial_3.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_3.mp4) | 128.84 MB | 1080x1920 | h264 | 33,153 kbps | 32.60s | **yes** |
| `Testimonial_4.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_4.mp4) | 118.38 MB | 1080x1920 | h264 | 33,962 kbps | 29.24s | **yes** |
| `Testimonial_5.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_5.mp4) | 100.98 MB | 1080x1920 | h264 | 33,669 kbps | 25.16s | **yes** |
| `Testimonial_6.mp4` | [Link](https://pub-2e99560076ce45129d0b8c3d0e62ad9c.r2.dev/student%20-testimonials/Testimonial_6.mp4) | 119.03 MB | 1080x1920 | h264 | 32,845 kbps | 30.40s | **yes** |

* **Total Count:** 21 unique video files.
* **Total Combined Payload:** **1,433.65 MB (1.43 GB)**.

---

### 7. BUILD AND TESTS

* Command: `powershell -Command "Test-Path package.json"`
* Raw Command Output:
```
False
No package.json found in project directory.
```
* Status: **NO BUILD/TEST CONFIGURED** (Standard static website hosted directly on GitHub Pages).

---

### 8. COMPRESSION ASSESSMENT (Technical Analysis)

* **Analysis of Current Bitrates:**
  * The 6 student testimonial videos alone total **726 MB** for a combined video duration of **181.6 seconds** (~3 minutes).
  * They are encoded at master export bitrates of **~33 Mbps (33,000 kbps)** in 1080x1920 H.264.
  * In addition:
    * `6 Podcast edit .mp4` is **235.12 MB** (100.5s duration at 19.6 Mbps).
    * `4UGC ads editing.mp4` is **221.41 MB** (57.36s duration at 32.4 Mbps).
    * `9, 2d animation.mp4` is **102.89 MB** (22.20s duration at 38.9 Mbps).

* **Impact on Slow 4G (1.6 Mbps connection):**
  * A 33 Mbps video exceeds a 1.6 Mbps network connection by **20x**.
  * On a 1.6 Mbps Slow 4G connection, downloading a 25-second testimonial (100 MB) takes **~500 seconds (over 8 minutes)** if played from start to end without throttling.

* **Estimated Savings with Web-Optimized Re-Encoding:**
  * Re-encoding the testimonials with standard web delivery parameters (H.264, 1080p, CRF 23, AAC 128kbps, bitrate target ~2.5–3.5 Mbps):
    * Testimonial 1 (25.8s): 103.8 MB $\rightarrow$ **~8.5 MB (91.8% savings)**
    * Testimonial 2 (38.4s): 154.9 MB $\rightarrow$ **~12.0 MB (92.2% savings)**
    * Testimonial 3 (32.6s): 128.8 MB $\rightarrow$ **~10.5 MB (91.8% savings)**
    * Testimonial 4 (29.2s): 118.4 MB $\rightarrow$ **~9.5 MB (91.9% savings)**
    * Testimonial 5 (25.1s): 100.9 MB $\rightarrow$ **~8.0 MB (92.0% savings)**
    * Testimonial 6 (30.4s): 119.0 MB $\rightarrow$ **~9.8 MB (91.7% savings)**
  * **Total Testimonials Estimated Payload Reduction:** **726.0 MB $\rightarrow$ ~58.3 MB (~667 MB savings, 92% reduction)**.

---

## 2. Failed Checks
* **INP (Interaction to Next Paint):** Measured at **728 ms** on mouse/pointer events during complex scroll stacking animations (Google threshold is $\le$ 200 ms).
* **Cloudflare Cache Headers:** Failed default caching check; `pub-*.r2.dev` returns no `Cache-Control` and no `CF-Cache-Status` headers on any HEAD/GET requests.

---

## 3. NOT RUN Items and Reasons
* **Real User Field Data (CrUX API):** **NO FIELD DATA** — The domain `https://krsna110.github.io/artist-building-version-2/` does not meet the minimum real-user traffic threshold in the Google Chrome User Experience dataset.

---

## 4. Remaining Issues
1. **Uncached Origin Delivery:** Video files are fetched directly from the R2 origin endpoint (`pub-*.r2.dev`) without Cloudflare edge CDN caching headers (`Cache-Control: public, max-age=31536000, immutable`).
2. **Excessive File Bitrates for Testimonials & Podcast:** 9 of the 21 videos exceed 30 Mbps, which will stall on sub-3G/4G cellular connections if played for more than a few seconds.

---

## 5. Exact Files Read & Git Status

### Files Read
1. `index.html` (lines 1–1494)
2. `script.js` (lines 1–784)
3. `styles.css` (lines 1–4203)
4. `skill-card-swipe.css` (lines 1–283)

### Working Tree Verification (`git status`)
```
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	REPORT.md

nothing added to commit but untracked files present (use "git add" to track)
```
*(Zero repository code files were modified, rewritten, or redesigned. `REPORT.md` is left untracked in working directory).*
