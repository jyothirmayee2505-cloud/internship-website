// ---------- Mobile navigation toggle ----------
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? 'Close' : 'Menu';
  });
}

// ---------- Live viewport width indicator (home page) ----------
const vpWidth = document.getElementById('vp-width');
if (vpWidth) {
  const vpLabel = document.getElementById('vp-label');
  const vpBar = document.getElementById('vp-bar');
  const update = () => {
    const w = window.innerWidth;
    vpWidth.textContent = w + ' px';
    vpLabel.textContent = w <= 820 ? 'Mobile / tablet layout' : 'Desktop layout';
    vpBar.style.width = Math.min(100, (w / 1600) * 100) + '%';
  };
  update();
  window.addEventListener('resize', update);
}

// ---------- Contact form validation ----------
const form = document.getElementById('contact-form');
if (form) {
  const rules = {
    name: v => v.trim().length >= 2 || 'Enter your name (at least 2 characters).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Enter a valid email, like name@example.com.',
    message: v => v.trim().length >= 10 || 'Write a message of at least 10 characters.'
  };
  const check = field => {
    const result = rules[field.name](field.value);
    document.getElementById(field.name + '-error').textContent = result === true ? '' : result;
    field.classList.toggle('invalid', result !== true);
    return result === true;
  };
  const fields = [...form.querySelectorAll('input,textarea')];
  fields.forEach(f => f.addEventListener('blur', () => check(f)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = fields.map(check).every(Boolean);
    const status = document.getElementById('form-status');
    if (valid) {
      status.textContent = 'Message sent. Thank you, I will reply soon.';
      status.className = 'form-status ok';
      form.reset();
    } else {
      status.className = 'form-status';
      form.querySelector('.invalid').focus();
    }
  });
}
