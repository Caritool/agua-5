/* ── CARRUSEL ── */
const track = document.getElementById("track");
const dots = document.getElementById("dots");
const curEl = document.getElementById("cur");
const totEl = document.getElementById("tot");
const VISIBLE = 2;
const cards = Array.from(track.children);
const pages = Math.ceil(cards.length / VISIBLE);
let page = 0;

totEl.textContent = pages;
for (let i = 0; i < pages; i++) {
  const d = document.createElement("div");
  d.className = "dot" + (i === 0 ? " active" : "");
  d.addEventListener("click", () => go(i));
  dots.appendChild(d);
}
function go(p) {
  page = Math.max(0, Math.min(p, pages - 1));
  track.style.transform = `translateX(-${page * VISIBLE * (cards[0].offsetWidth + 26)}px)`;
  curEl.textContent = page + 1;
  dots
    .querySelectorAll(".dot")
    .forEach((d, i) => d.classList.toggle("active", i === page));
}
document.getElementById("prev").addEventListener("click", () => go(page - 1));
document.getElementById("next").addEventListener("click", () => go(page + 1));
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") go(page + 1);
  if (e.key === "ArrowLeft") go(page - 1);
});

/* ── NAV LATERAL: sección activa ── */
const navBtns = document.querySelectorAll(".side-nav-btn");
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navBtns.forEach((btn) =>
          btn.classList.toggle("active", btn.dataset.section === id),
        );
      }
    });
  },
  { threshold: 0.55 },
);
sections.forEach((sec) => observer.observe(sec));
