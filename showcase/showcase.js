document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('img-compare');
  const afterImg = container.querySelector('.img-compare-after');
  const slider = document.getElementById('img-slider');
  let dragging = false;

  function setReveal(percent) {
    percent = Math.max(0, Math.min(1, percent));
    afterImg.style.clipPath = `inset(0 0 0 ${percent * 100}%)`;
    slider.style.left = `${percent * 100}%`;
  }

  setReveal(0.5);

  function onMove(e) {
    if (!dragging) return;
    let rect = container.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    let percent = x / rect.width;
    setReveal(percent);
  }

  slider.addEventListener('mousedown', (e) => { dragging = true; e.preventDefault(); });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', () => dragging = false);

  slider.addEventListener('touchstart', (e) => { dragging = true; e.preventDefault(); });
  window.addEventListener('touchmove', onMove);
  window.addEventListener('touchend', () => dragging = false);

  container.addEventListener('mousedown', (e) => {
    if (e.target === slider) return;
    let rect = container.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    setReveal(percent);
  });
  container.addEventListener('touchstart', (e) => {
    if (e.target === slider) return;
    let rect = container.getBoundingClientRect();
    let percent = (e.touches[0].clientX - rect.left) / rect.width;
    setReveal(percent);
  });
});