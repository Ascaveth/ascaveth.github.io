(() => {
  const loader = document.querySelector('.intro-loader');
  if (typeof loader.showModal !== 'function') {
    loader.remove();
    return;
  }
  try {
    if (sessionStorage.getItem('portfolio-intro-seen')) {
      loader.remove();
      return;
    }
    sessionStorage.setItem('portfolio-intro-seen', 'true');
  } catch {
    // Storage restrictions should not prevent the page from opening.
  }

  loader.showModal();
  document.documentElement.classList.add('intro-loading');
  let dismissing = false;
  function dismiss() {
    if (dismissing) return;
    dismissing = true;
    document.documentElement.classList.remove('intro-loading');
    document.documentElement.classList.add('intro-ready');
    loader.classList.add('is-leaving');
    setTimeout(() => {
      loader.close();
      loader.remove();
    }, 250);
  }
  loader.addEventListener('cancel', event => {
    event.preventDefault();
    dismiss();
  });
  const image = loader.querySelector('img');
  if (image.complete && image.naturalWidth) {
    image.classList.add('is-ready');
  } else {
    image.addEventListener('load', () => image.classList.add('is-ready'), { once: true });
    image.addEventListener('error', dismiss, { once: true });
  }
  setTimeout(dismiss, 2500);
})();
