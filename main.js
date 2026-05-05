// NaturaGene – main.js

// --- Scroll fade-up animation ---
document.querySelectorAll(
  '.product-info-block, .product-image-block, .review-card, .offer-deal-card, .why-card, .comparison-table-wrap, .overall-rating, .final-cta-inner, .hts-item'
).forEach(el => el.classList.add('fade-up'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// --- Stock bar animate on scroll ---
const fill = document.getElementById('stock-bar-fill');
if (fill) {
  const sio = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { fill.style.width = '77%'; sio.disconnect(); }
  }, { threshold: 0.5 });
  sio.observe(fill);
}

// --- Sticky header hide/show on scroll ---
let last = 0;
const hdr = document.getElementById('site-header');
if (hdr) {
  hdr.style.transition = 'transform 0.28s ease';
  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    hdr.style.transform = (cur > last && cur > 60) ? 'translateY(-100%)' : 'translateY(0)';
    last = cur;
  }, { passive: true });
}

// --- Countdown timer ---
function startCountdown(totalSeconds) {
  const hh = document.getElementById('cd-hh');
  const mm = document.getElementById('cd-mm');
  const ss = document.getElementById('cd-ss');
  if (!hh || !mm || !ss) return;
  let s = totalSeconds;
  const tick = () => {
    if (s <= 0) s = totalSeconds;
    s--;
    hh.textContent = String(Math.floor(s / 3600)).padStart(2, '0');
    mm.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    ss.textContent = String(s % 60).padStart(2, '0');
  };
  tick();
  setInterval(tick, 1000);
}
startCountdown(35253); // ~9h 47m 33s

// --- CTA pulse on load ---
setTimeout(() => {
  const cta = document.getElementById('hero-shop-btn');
  if (cta) cta.style.animation = 'ctaPulse 2.5s ease-in-out 1';
}, 1000);

const st = document.createElement('style');
st.textContent = `
  @keyframes ctaPulse {
    0%,100%{transform:scale(1)}
    50%{transform:scale(1.04);box-shadow:0 10px 28px rgba(255,153,0,.55)}
  }
`;
document.head.appendChild(st);
