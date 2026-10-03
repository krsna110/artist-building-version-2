/**
 * Advanced Video Editing Course — Registration Modal Logic
 * Controls opening, closing, multi-question validation, progress tracking,
 * and seamless submission to WhatsApp & local storage.
 */

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('registration-modal');
    const backdrop = document.getElementById('reg-modal-backdrop');
    const closeBtn = document.getElementById('reg-modal-close');
    const form = document.getElementById('registration-form');
    const successCard = document.getElementById('reg-success-card');
    const submitBtn = document.getElementById('reg-submit-btn');
    const progressBar = document.getElementById('reg-progress-bar');
    const progressLabel = document.getElementById('reg-progress-label');
    const progressPercent = document.getElementById('reg-progress-percent');
    const successCloseBtn = document.getElementById('success-close-btn');
    const successWaBtn = document.getElementById('success-wa-btn');

    if (!modal || !form) return;

    // === Open Modal Function ===
    function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Auto-focus first option or input for accessibility
        setTimeout(() => {
            const firstRadio = modal.querySelector('input[type="radio"]');
            if (firstRadio) firstRadio.focus();
        }, 100);
    }

    // === Close Modal Function ===
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Bind Close Triggers
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeModal);

    // Escape Key to Close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // === Bind All "Register Now" / CTA Buttons on the page ===
    const ctaSelectors = [
        '#btn-hero-cta',
        '#btn-mid-cta',
        '#btn-advantage-cta',
        '#btn-mid-cta-2',
        '#btn-final-cta',
        '#btn-sticky',
        'a[href="#apply"]',
        '[data-open-modal="course-register-modal"]'
    ];

    ctaSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });
    });

    // Also catch any button whose text contains "Register Now" or "Enroll Now"
    document.querySelectorAll('a, button').forEach(el => {
        const text = (el.textContent || '').trim().toLowerCase();
        if (text === 'register now' || text.startsWith('enroll now')) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });

    // === Question 1: "Other" Toggle ===
    const q1Radios = form.querySelectorAll('input[name="current_status"]');
    const q1OtherWrap = document.getElementById('q1-other-wrap');
    const q1OtherInput = form.querySelector('input[name="current_status_other"]');

    q1Radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'Other' && radio.checked) {
                q1OtherWrap.style.display = 'block';
                if (q1OtherInput) q1OtherInput.focus();
            } else {
                q1OtherWrap.style.display = 'none';
                if (q1OtherInput) q1OtherInput.value = '';
            }
            clearError('reg-q1-block');
            updateProgress();
        });
    });

    // === Question 3: "Other" Toggle ===
    const q3Radios = form.querySelectorAll('input[name="learning_reason"]');
    const q3OtherWrap = document.getElementById('q3-other-wrap');
    const q3OtherInput = form.querySelector('input[name="learning_reason_other"]');

    q3Radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'Other' && radio.checked) {
                q3OtherWrap.style.display = 'block';
                if (q3OtherInput) q3OtherInput.focus();
            } else {
                q3OtherWrap.style.display = 'none';
                if (q3OtherInput) q3OtherInput.value = '';
            }
            clearError('reg-q3-block');
            updateProgress();
        });
    });

    // Clear error on Q2 & Q4 radio select
    form.querySelectorAll('input[name="editing_level"]').forEach(r => {
        r.addEventListener('change', () => {
            clearError('reg-q2-block');
            updateProgress();
        });
    });

    form.querySelectorAll('input[name="joining_timeline"]').forEach(r => {
        r.addEventListener('change', () => {
            clearError('reg-q4-block');
            updateProgress();
        });
    });

    // Clear error on Q5 text inputs
    ['reg-fullname', 'reg-phone', 'reg-city'].forEach(id => {
        const inp = document.getElementById(id);
        if (inp) {
            inp.addEventListener('input', () => {
                const parentField = inp.closest('.reg-field');
                if (parentField) parentField.classList.remove('has-error');
                clearError('reg-q5-block');
                updateProgress();
            });
        }
    });

    function clearError(blockId) {
        const block = document.getElementById(blockId);
        if (block) {
            block.classList.remove('has-error');
            block.classList.add('answered');
        }
    }

    // === Live Progress Calculator (5 Questions) ===
    function calculateProgress() {
        let answered = 0;

        // Q1: Current status
        const q1Checked = form.querySelector('input[name="current_status"]:checked');
        if (q1Checked) {
            if (q1Checked.value !== 'Other' || (q1OtherInput && q1OtherInput.value.trim().length > 0)) {
                answered++;
                document.getElementById('reg-q1-block')?.classList.add('answered');
            }
        } else {
            document.getElementById('reg-q1-block')?.classList.remove('answered');
        }

        // Q2: Editing level
        if (form.querySelector('input[name="editing_level"]:checked')) {
            answered++;
            document.getElementById('reg-q2-block')?.classList.add('answered');
        } else {
            document.getElementById('reg-q2-block')?.classList.remove('answered');
        }

        // Q3: Reason
        const q3Checked = form.querySelector('input[name="learning_reason"]:checked');
        if (q3Checked) {
            if (q3Checked.value !== 'Other' || (q3OtherInput && q3OtherInput.value.trim().length > 0)) {
                answered++;
                document.getElementById('reg-q3-block')?.classList.add('answered');
            }
        } else {
            document.getElementById('reg-q3-block')?.classList.remove('answered');
        }

        // Q4: Timeline
        if (form.querySelector('input[name="joining_timeline"]:checked')) {
            answered++;
            document.getElementById('reg-q4-block')?.classList.add('answered');
        } else {
            document.getElementById('reg-q4-block')?.classList.remove('answered');
        }

        // Q5: Details (Full name + Phone + City)
        const nameVal = (document.getElementById('reg-fullname')?.value || '').trim();
        const phoneVal = (document.getElementById('reg-phone')?.value || '').trim();
        const cityVal = (document.getElementById('reg-city')?.value || '').trim();

        if (nameVal && phoneVal.length >= 7 && cityVal) {
            answered++;
            document.getElementById('reg-q5-block')?.classList.add('answered');
        } else {
            document.getElementById('reg-q5-block')?.classList.remove('answered');
        }

        return answered;
    }

    function updateProgress() {
        const answered = calculateProgress();
        const pct = Math.round((answered / 5) * 100);

        if (progressBar) progressBar.style.width = `${pct}%`;
        if (progressLabel) progressLabel.textContent = `${answered} of 5 answered`;
        if (progressPercent) progressPercent.textContent = `${pct}%`;
    }

    // === Form Validation & Submit Handler ===
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let hasError = false;
        let firstErrorElement = null;

        // Validate Q1
        const q1 = form.querySelector('input[name="current_status"]:checked');
        const q1Block = document.getElementById('reg-q1-block');
        if (!q1) {
            q1Block.classList.add('has-error');
            hasError = true;
            if (!firstErrorElement) firstErrorElement = q1Block;
        } else if (q1.value === 'Other' && (!q1OtherInput || !q1OtherInput.value.trim())) {
            q1Block.classList.add('has-error');
            hasError = true;
            if (!firstErrorElement) firstErrorElement = q1OtherInput;
        } else {
            q1Block.classList.remove('has-error');
        }

        // Validate Q2
        const q2 = form.querySelector('input[name="editing_level"]:checked');
        const q2Block = document.getElementById('reg-q2-block');
        if (!q2) {
            q2Block.classList.add('has-error');
            hasError = true;
            if (!firstErrorElement) firstErrorElement = q2Block;
        } else {
            q2Block.classList.remove('has-error');
        }

        // Validate Q3
        const q3 = form.querySelector('input[name="learning_reason"]:checked');
        const q3Block = document.getElementById('reg-q3-block');
        if (!q3) {
            q3Block.classList.add('has-error');
            hasError = true;
            if (!firstErrorElement) firstErrorElement = q3Block;
        } else if (q3.value === 'Other' && (!q3OtherInput || !q3OtherInput.value.trim())) {
            q3Block.classList.add('has-error');
            hasError = true;
            if (!firstErrorElement) firstErrorElement = q3OtherInput;
        } else {
            q3Block.classList.remove('has-error');
        }

        // Validate Q4
        const q4 = form.querySelector('input[name="joining_timeline"]:checked');
        const q4Block = document.getElementById('reg-q4-block');
        if (!q4) {
            q4Block.classList.add('has-error');
            hasError = true;
            if (!firstErrorElement) firstErrorElement = q4Block;
        } else {
            q4Block.classList.remove('has-error');
        }

        // Validate Q5 (Name, Phone, City)
        const nameInput = document.getElementById('reg-fullname');
        const phoneInput = document.getElementById('reg-phone');
        const cityInput = document.getElementById('reg-city');
        const q5Block = document.getElementById('reg-q5-block');

        let q5HasError = false;

        if (!nameInput || !nameInput.value.trim()) {
            nameInput?.closest('.reg-field')?.classList.add('has-error');
            q5HasError = true;
            if (!firstErrorElement) firstErrorElement = nameInput;
        } else {
            nameInput.closest('.reg-field')?.classList.remove('has-error');
        }

        const phoneVal = (phoneInput?.value || '').replace(/[^0-9+]/g, '');
        if (!phoneVal || phoneVal.length < 8) {
            phoneInput?.closest('.reg-field')?.classList.add('has-error');
            q5HasError = true;
            if (!firstErrorElement) firstErrorElement = phoneInput;
        } else {
            phoneInput.closest('.reg-field')?.classList.remove('has-error');
        }

        if (!cityInput || !cityInput.value.trim()) {
            cityInput?.closest('.reg-field')?.classList.add('has-error');
            q5HasError = true;
            if (!firstErrorElement) firstErrorElement = cityInput;
        } else {
            cityInput.closest('.reg-field')?.classList.remove('has-error');
        }

        if (q5HasError) {
            q5Block.classList.add('has-error');
            hasError = true;
        } else {
            q5Block.classList.remove('has-error');
        }

        // Scroll to first error if any
        if (hasError && firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (typeof firstErrorElement.focus === 'function') {
                firstErrorElement.focus();
            }
            return;
        }

        // Collect Form Data
        const currentStatus = q1.value === 'Other' ? `Other (${q1OtherInput.value.trim()})` : q1.value;
        const editingLevel = q2.value;
        const learningReason = q3.value === 'Other' ? `Other (${q3OtherInput.value.trim()})` : q3.value;
        const joiningTimeline = q4.value;
        const fullName = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const city = cityInput.value.trim();

        const submissionData = {
            course: 'Advanced Video Editing Course',
            currentStatus,
            editingLevel,
            learningReason,
            joiningTimeline,
            fullName,
            phone,
            city,
            submittedAt: new Date().toISOString()
        };

        // UI Loading State
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Save to localStorage
        try {
            const history = JSON.parse(localStorage.getItem('artistbuilding_registrations') || '[]');
            history.push(submissionData);
            localStorage.setItem('artistbuilding_registrations', JSON.stringify(history));
        } catch (e) {
            console.warn('Storage unavailable', e);
        }

        // Simulate 600ms network request then show success
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Populate Success Screen
            const nameTarget = document.getElementById('success-student-name');
            const phoneTarget = document.getElementById('success-student-phone');
            const cityTarget = document.getElementById('success-student-city');
            const timelineTarget = document.getElementById('success-student-timeline');

            if (nameTarget) nameTarget.textContent = fullName;
            if (phoneTarget) phoneTarget.textContent = phone;
            if (cityTarget) cityTarget.textContent = city;
            if (timelineTarget) timelineTarget.textContent = joiningTimeline;

            // Configure WhatsApp link
            if (successWaBtn) {
                const waMessage = `Hi Artistbuilding! I just registered for the *Advanced Video Editing Course* on the website.\n\n*My Details:*\n• *Name:* ${fullName}\n• *Phone:* ${phone}\n• *City:* ${city}\n• *Status:* ${currentStatus}\n• *Current Editing Level:* ${editingLevel}\n• *Goal:* ${learningReason}\n• *Plan to join:* ${joiningTimeline}\n\nPlease share the syllabus and next batch schedule!`;
                successWaBtn.href = `https://wa.me/917400624414?text=${encodeURIComponent(waMessage)}`;
            }

            // Hide Form, Show Success Card
            form.style.display = 'none';
            if (successCard) successCard.style.display = 'block';

            // Scroll modal body to top smoothly
            const modalBody = document.getElementById('reg-modal-body');
            if (modalBody) modalBody.scrollTop = 0;

            // Set progress to 100%
            if (progressBar) progressBar.style.width = '100%';
            if (progressLabel) progressLabel.textContent = 'Application Completed';
            if (progressPercent) progressPercent.textContent = '100%';
        }, 600);
    });

    // Reset Form when modal is closed after success
    function resetFormState() {
        if (form.style.display === 'none') {
            form.reset();
            form.style.display = 'block';
            if (successCard) successCard.style.display = 'none';
            if (q1OtherWrap) q1OtherWrap.style.display = 'none';
            if (q3OtherWrap) q3OtherWrap.style.display = 'none';
            document.querySelectorAll('.reg-question-block').forEach(b => {
                b.classList.remove('has-error', 'answered');
            });
            document.querySelectorAll('.reg-field').forEach(f => {
                f.classList.remove('has-error');
            });
            updateProgress();
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', resetFormState);
    if (backdrop) backdrop.addEventListener('click', resetFormState);
    if (successCloseBtn) successCloseBtn.addEventListener('click', resetFormState);

    // Initial progress computation
    updateProgress();
});
