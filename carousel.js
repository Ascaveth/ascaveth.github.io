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
  const feedback = document.createElement('div');
  feedback.className = 'carousel-feedback';
  const message = document.createElement('p');
  message.setAttribute('role', 'status');
  const recovery = document.createElement('a');
  recovery.textContent = 'Open original image';
  feedback.append(message, recovery);
  gallery.append(feedback, controls);

  let current = 0;
  let animation;
  let nearViewport = false;
  function updateFeedback() {
    const image = slides[current].querySelector('img');
    const loaded = image.complete && image.naturalWidth > 0;
    const failed = image.complete && !image.naturalWidth;
    image.style.visibility = loaded ? '' : 'hidden';
    feedback.hidden = loaded;
    message.textContent = failed ? 'The photo could not be loaded.' : 'Loading photo…';
    recovery.hidden = !failed;
    recovery.href = slides[current].querySelector('a').href;
  }
  slides.forEach((slide, index) => {
    const image = slide.querySelector('img');
    for (const event of ['load', 'error']) {
      image.addEventListener(event, () => {
        if (index === current) updateFeedback();
      });
    }
  });
  function prefetch() {
    slides[current].querySelector('img').loading = 'eager';
    slides[(current + 1) % slides.length].querySelector('img').loading = 'eager';
  }
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
    if (nearViewport || animate) prefetch();
    updateFeedback();
    if (animate && image.complete && image.naturalWidth && typeof image.animate === 'function') {
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
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      nearViewport = true;
      prefetch();
      observer.disconnect();
    }, { rootMargin: '300px' });
    observer.observe(gallery);
  }
}
