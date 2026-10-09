// Featured events slider
(function () {
  const slides = Array.from(document.querySelectorAll(".feature .slide"));
  const count = document.getElementById("featCount");
  let active = 0;

  function go(i) {
    active = (i + slides.length) % slides.length;
    slides.forEach((s, k) => { s.hidden = k !== active; });
    count.textContent = `${active + 1} / ${slides.length}`;
  }
  document.getElementById("featPrev").addEventListener("click", () => go(active - 1));
  document.getElementById("featNext").addEventListener("click", () => go(active + 1));
})();

// Photo lightbox: steps through the photos of the slide that was clicked
(function () {
  const box = document.getElementById("lightbox");
  const img = box.querySelector("img");
  let photos = [];
  let current = 0;

  function show(i) {
    current = (i + photos.length) % photos.length;
    img.src = photos[current].src;
    img.alt = photos[current].alt;
  }
  function open(button) {
    photos = Array.from(button.closest(".slide").querySelectorAll(".shot img"));
    show(photos.indexOf(button.querySelector("img")));
    box.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".shot").forEach((b) => b.addEventListener("click", () => open(b)));
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".prev").addEventListener("click", () => show(current - 1));
  box.querySelector(".next").addEventListener("click", () => show(current + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
