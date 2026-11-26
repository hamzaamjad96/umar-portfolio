/* =========================================================
   ✏️  APNI DETAILS YAHAN CHANGE KAREIN (sirf yeh hissa)
   ========================================================= */
const CONTACT = {
  whatsapp: "966592012934",          // country code ke saath, + aur spaces ke baghair
  phone: "+966 59 201 2934",         // jaisa dikhana hai
  location: "Based in Saudi Arabia · Available for on-site projects",
  whatsappMessage: "Hello Umar, I saw your portfolio and need help with a network project."
};

/* Project photos — naya photo add karna ho to images/ folder mein daalein
   aur yahan ek line add karein. cat: cabling | fiber | cctv | voice | wifi */
const PROJECTS = [
  { src: "images/server-rack-ups.jpg",      title: "Network rack with switches & UPS",   cat: "cabling" },
  { src: "images/fiber-patch-panel.jpg",    title: "Fiber & copper patch panel management", cat: "fiber" },
  { src: "images/rack-install.jpg",         title: "Floor-standing rack installation",   cat: "cabling" },
  { src: "images/cctv-monitoring.jpg",      title: "CCTV NVR monitoring wall",           cat: "cctv" },
  { src: "images/fiber-rack.jpg",           title: "Fiber termination rack",             cat: "fiber" },
  { src: "images/outdoor-cctv-night.jpg",   title: "Outdoor CCTV installation",          cat: "cctv" },
  { src: "images/ceiling-cabling.jpg",      title: "Cable pulling & ceiling cabling",    cat: "cabling" },
  { src: "images/wall-rack-cctv.jpg",       title: "Wall-mount rack with CCTV display",  cat: "cctv" },
  { src: "images/outdoor-dome-camera.jpg",  title: "Dome camera mounting",               cat: "cctv" },
  { src: "images/onsite-install.jpg",       title: "On-site installation work",          cat: "cabling" },
  { src: "images/ip-phone.jpg",             title: "IP phone deployment",                cat: "voice" },
  { src: "images/ip-phone-desk.jpg",        title: "Voice point & IP phone setup",       cat: "voice" },
  { src: "images/ip-phone-workstation.jpg", title: "Workstation telephone installation", cat: "voice" },
  { src: "images/mesh-wifi.jpg",            title: "Mesh Wi‑Fi access point",            cat: "wifi" },
  { src: "images/wall-mount-rack.jpg",      title: "Wall-mount network cabinet",         cat: "cabling" }
];

/* ================= Contact links ================= */
const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
["heroWhatsapp", "cWhatsapp", "waFloat"].forEach(id => (document.getElementById(id).href = waLink));
document.getElementById("cWhatsappText").textContent = CONTACT.phone;
document.getElementById("cPhone").href = "tel:" + CONTACT.phone.replace(/\s/g, "");
document.getElementById("cPhoneText").textContent = CONTACT.phone;
document.getElementById("locationText").textContent = "📍 " + CONTACT.location;
document.getElementById("year").textContent = new Date().getFullYear();

/* ================= Theme toggle ================= */
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

/* ================= Mobile menu ================= */
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* Navbar shadow on scroll */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 10));

/* ================= Gallery ================= */
const gallery = document.getElementById("gallery");
let visible = PROJECTS;

function renderGallery(filter) {
  visible = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
  gallery.innerHTML = visible
    .map((p, i) => `
      <figure class="g-item" data-i="${i}">
        <img src="${p.src}" alt="${p.title}" loading="lazy" />
        <figcaption><span class="tag">${p.cat}</span>${p.title}</figcaption>
      </figure>`)
    .join("");
  gallery.querySelectorAll(".g-item").forEach(el =>
    el.addEventListener("click", () => openLightbox(+el.dataset.i))
  );
}
document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#filters button").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  renderGallery(b.dataset.filter);
});
renderGallery("all");

/* ================= Lightbox ================= */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let cur = 0;
function openLightbox(i) {
  cur = i;
  lbImg.src = visible[i].src;
  lbImg.alt = visible[i].title;
  lbCap.textContent = visible[i].title;
  lb.classList.add("open");
}
function closeLightbox() { lb.classList.remove("open"); }
function step(d) { openLightbox((cur + d + visible.length) % visible.length); }
document.getElementById("lbClose").onclick = closeLightbox;
document.getElementById("lbPrev").onclick = () => step(-1);
document.getElementById("lbNext").onclick = () => step(1);
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

/* ================= Reveal on scroll ================= */
const io = new IntersectionObserver(
  entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
