/* =============================================
   BARONTECH — contact.js
   Form validation & WhatsApp redirect
   ============================================= */

(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn   = document.getElementById('submitBtn');
  const btnText     = document.getElementById('btnText');
  const btnLoading  = document.getElementById('btnLoading');
  const formSuccess = document.getElementById('formSuccess');

  const WHATSAPP_NUMBER = '233277778248';

  const fields = {
    name:    { el: document.getElementById('name'),    err: document.getElementById('nameError') },
    email:   { el: document.getElementById('email'),   err: document.getElementById('emailError') },
    message: { el: document.getElementById('message'), err: document.getElementById('messageError') },
  };

  const rules = {
    name:    { fn: (v) => v.trim().length >= 2,                         msg: 'Please enter your name (at least 2 characters).' },
    email:   { fn: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
    message: { fn: (v) => v.trim().length >= 10,                        msg: 'Message must be at least 10 characters.' },
  };

  function setError(key, msg) {
    fields[key].el.classList.add('error');
    fields[key].err.textContent = msg;
  }
  function clearError(key) {
    fields[key].el.classList.remove('error');
    fields[key].err.textContent = '';
  }

  /* ── INLINE VALIDATION ── */
  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('blur', () => {
      rules[key].fn(fields[key].el.value) ? clearError(key) : setError(key, rules[key].msg);
    });
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error') && rules[key].fn(fields[key].el.value)) {
        clearError(key);
      }
    });
  });

  /* ── SUBMIT ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    Object.keys(rules).forEach((key) => {
      if (!rules[key].fn(fields[key].el.value)) {
        setError(key, rules[key].msg);
        valid = false;
      } else {
        clearError(key);
      }
    });
    if (!valid) return;

    // Loading state
    submitBtn.disabled       = true;
    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline-flex';

    // Grab values
    const name    = fields.name.el.value.trim();
    const email   = fields.email.el.value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = fields.message.el.value.trim();

    // Build WhatsApp message
    const text = [
      `👋 Hi, I'm *${name}*`,
      `📧 Email: ${email}`,
      subject ? `📌 Subject: ${subject}` : null,
      ``,
      `💬 Message:`,
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    // Show success flash then open WhatsApp
    formSuccess.classList.add('show');

    setTimeout(() => {
      form.reset();
      submitBtn.disabled       = false;
      btnText.style.display    = 'inline-flex';
      btnLoading.style.display = 'none';
      formSuccess.classList.remove('show');

      window.open(whatsappURL, '_blank');
    }, 1200);
  });

})();