for (const gallery of document.querySelectorAll('[data-carousel]')) {
  const slides = [...gallery.querySelectorAll('figure')];
  const name = gallery.closest('article').querySelector('h3').textContent;
  gallery.classList.add('carousel');
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-roledescription', 'carousel');
  gallery.setAttribute('aria-label', `${name} photos`);

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg>';
  previous.setAttribute('aria-label', `Previous photo: ${name}`);
  const status = document.createElement('span');
  status.className = 'visually-hidden';
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  const next = document.createElement('button');
  next.type = 'button';
  next.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg>';
  next.setAttribute('aria-label', `Next photo: ${name}`);
  const progress = document.createElement('div');
  progress.className = 'carousel-progress';
  progress.setAttribute('aria-hidden', 'true');
  const markers = slides.map(() => {
    const marker = document.createElement('span');
    progress.append(marker);
    return marker;
  });
  controls.append(previous, progress, next, status);
  gallery.append(controls);

  let current = 0;
  let animation;
  function show(index, animate = true) {
    if (animation) animation.cancel();
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
    });
    status.textContent = `${current + 1} of ${slides.length}`;
    markers.forEach((marker, i) => marker.classList.toggle('is-active', i === current));
    const image = slides[current].querySelector('img');
    image.loading = 'eager';
    const nextImage = slides[(current + 1) % slides.length].querySelector('img');
    nextImage.loading = 'eager';
    if (animate && typeof image.animate === 'function') {
      animation = image.animate([{ opacity: 0.3 }, { opacity: 1 }], {
        duration: 220, easing: 'ease-out'
      });
    }
  }
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  controls.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  show(0, false);
}
