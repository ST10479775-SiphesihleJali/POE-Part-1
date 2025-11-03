/* js-assets/scripts.js
   Single-file, robust implementation for:
   - accordion (FAQ)
   - gallery lightbox
   - contact form validation + feedback
   - header search: highlight + dim
   - defensive checks and console logging for troubleshooting
*/

(function () {
  'use strict';

  function safeLog(...args) {
    if (window && window.console) console.log('[GreenSteps]', ...args);
  }

  try {
    document.addEventListener('DOMContentLoaded', () => {
      safeLog('GreenSteps scripts loaded');

      /* ---------------- ACCORDION ---------------- */
      (function initAccordion() {
        const accButtons = Array.from(document.querySelectorAll('.accordion'));
        if (!accButtons.length) {
          safeLog('No accordion elements found on this page.');
        }
        accButtons.forEach(btn => {
          btn.setAttribute('aria-expanded', 'false');
          btn.setAttribute('role', 'button');
          btn.addEventListener('click', () => {
            const panel = btn.nextElementSibling;
            if (!panel) return;
            const isOpen = panel.style.display === 'block';
            // close all panels
            document.querySelectorAll('.panel').forEach(p => {
              p.style.display = 'none';
              const prevBtn = p.previousElementSibling;
              if (prevBtn && prevBtn.classList.contains('accordion')) prevBtn.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
              panel.style.display = 'block';
              btn.setAttribute('aria-expanded', 'true');
              setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
            } else {
              panel.style.display = 'none';
              btn.setAttribute('aria-expanded', 'false');
            }
          });
        });
      })();

      /* ---------------- LIGHTBOX ---------------- */
(function initLightbox() {
  const overlay = document.getElementById('lightbox');
  const overlayImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!overlay || !overlayImg) {
    console.warn('[GreenSteps] Lightbox elements not found on this page.');
    window.openLightbox = function () {};
    window.closeLightbox = function () {};
    return;
  }

  window.openLightbox = (src, alt = '') => {
    try {
      overlayImg.src = src;
      overlayImg.alt = alt || 'Expanded image';
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } catch (err) {
      console.error('[GreenSteps] Lightbox open error:', err);
    }
  };

  window.closeLightbox = () => {
    overlay.classList.remove('active');
    overlayImg.src = '';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Click outside image closes overlay
  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target === closeBtn) window.closeLightbox();
  });

  // ESC key closes overlay
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeLightbox();
  });

  console.log('[GreenSteps] Lightbox ready');
})();


      /* ---------------- CONTACT FORM VALIDATION ---------------- */
      (function initFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) {
          safeLog('No contact form found on this page.');
          return;
        }

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          // Remove old alert
          form.querySelectorAll('.form-alert').forEach(n => n.remove());

          const name = (form.querySelector('#name') || {}).value || '';
          const email = (form.querySelector('#email') || {}).value || '';
          const subject = (form.querySelector('#subject') || {}).value || '';
          const message = (form.querySelector('#message') || {}).value || '';

          const errors = [];
          if (!name.trim()) errors.push('Please enter your full name.');
          if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) errors.push('Please enter a valid email address.');
          if (!subject.trim()) errors.push('Please select a subject.');
          if (message.trim().length < 10) errors.push('Message must be at least 10 characters.');

          const alertBox = document.createElement('div');
          alertBox.className = 'form-alert';
          alertBox.style.marginTop = '1rem';
          alertBox.style.padding = '1rem';
          alertBox.style.borderRadius = '8px';
          alertBox.style.textAlign = 'center';

          if (errors.length) {
            alertBox.style.background = '#ffebee';
            alertBox.style.color = '#b71c1c';
            alertBox.innerHTML = `⚠️ <strong>Form Error</strong><br>${errors.join('<br>')}`;
            form.appendChild(alertBox);
            alertBox.focus && alertBox.focus();
            safeLog('Form validation failed:', errors);
            return;
          }

          // Simulated successful submission (replace with real submission if needed)
          alertBox.style.background = '#e8f5e9';
          alertBox.style.color = '#256029';
          alertBox.textContent = '✅ Thank you! Your message has been sent successfully.';
          form.reset();
          form.appendChild(alertBox);
          safeLog('Form submitted (simulated).');
        });

        safeLog('Contact form validation ready.');
      })();

      /* ---------------- HEADER SEARCH (highlight + dim) ---------------- */
      (function initSearch() {
        // Attach listeners to every search input present to be robust
        const searchInputs = Array.from(document.querySelectorAll('#searchInput, input[type="search"][id]')).filter(Boolean);
        if (!searchInputs.length) {
          safeLog('No search inputs found on this page.');
          return;
        }

        // Searchable blocks (global): use data-searchable attribute
        const searchableBlocks = Array.from(document.querySelectorAll('[data-searchable]'));

        function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

        function clearHighlights(el) {
          if (!el) return;
          const spans = el.querySelectorAll('span.search-highlight');
          spans.forEach(s => {
            const parent = s.parentNode;
            if (!parent) return;
            parent.replaceChild(document.createTextNode(s.textContent), s);
            parent.normalize();
          });
        }

        function highlightInElement(el, query) {
          if (!el) return 0;
          clearHighlights(el);
          if (!query) return 0;
          const re = new RegExp('(' + escapeRegExp(query) + ')', 'ig');
          // Replace only text nodes — but for simplicity use innerHTML cautiously
          try {
            el.innerHTML = el.innerHTML.replace(re, '<span class="search-highlight">$1</span>');
            return el.querySelectorAll('span.search-highlight').length;
          } catch (err) {
            // in case innerHTML replacement would break structured content, fallback to text-only search
            safeLog('Highlight fallback triggered', err);
            return 0;
          }
        }

        function runSearch(term) {
          const q = (term || '').trim().toLowerCase();
          if (!searchableBlocks.length) return;
          searchableBlocks.forEach(block => {
            clearHighlights(block);
            if (!q) {
              block.classList.remove('dim');
              return;
            }
            const text = block.textContent.toLowerCase();
            if (text.includes(q)) {
              highlightInElement(block, q);
              block.classList.remove('dim');
            } else {
              block.classList.add('dim');
            }
          });
        }

        // Debounce handler
        let debounceTimer;
        searchInputs.forEach(input => {
          input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => runSearch(e.target.value), 180);
          });
        });

        safeLog('Search initialised for', searchInputs.length, 'input(s).');
      })();

    }); // DOMContentLoaded
  } catch (err) {
    if (window && window.console) console.error('[GreenSteps] script error:', err);
    throw err;
  }
})();
// ========== CONTACT FORM VALIDATION ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const feedback = document.getElementById("formFeedback");
    const inputs = form.querySelectorAll("input, select, textarea");

    // Reset messages
    feedback.textContent = "";
    inputs.forEach((el) => {
      el.classList.remove("invalid");
      const errorMsg = el.parentElement.querySelector(".error-message");
      if (errorMsg) errorMsg.textContent = "";
    });

    // Validation logic
    inputs.forEach((el) => {
      if (el.hasAttribute("required") && !el.value.trim()) {
        showError(el, "This field is required.");
        isValid = false;
      } else if (el.type === "email" && !isValidEmail(el.value)) {
        showError(el, "Please enter a valid email address.");
        isValid = false;
      } else if (el.id === "phone" && el.value && !/^[0-9+() -]{7,}$/.test(el.value)) {
        showError(el, "Please enter a valid phone number.");
        isValid = false;
      }
    });

    if (!isValid) {
      feedback.textContent = "⚠ Please correct the errors and try again.";
      feedback.style.color = "#d32f2f";
      return;
    }

    // Success feedback
    feedback.textContent = "✅ Thank you! Your message has been sent successfully.";
    feedback.style.color = "#388e3c";
    form.reset();
  });

  function showError(element, message) {
    element.classList.add("invalid");
    const error = element.parentElement.querySelector(".error-message");
    if (error) error.textContent = message;
  }

  function isValidEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }
});

