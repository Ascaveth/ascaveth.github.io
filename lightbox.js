const photoDialog = document.createElement('dialog');
if (typeof photoDialog.showModal === 'function') {
  photoDialog.className = 'photo-lightbox';
  photoDialog.setAttribute('aria-label', 'Photo viewer. Press Escape or click outside the photo to close.');
  photoDialog.tabIndex = -1;
  const image = document.createElement('img');
  const caption = document.createElement('p');
  caption.id = 'lightbox-caption';
  photoDialog.setAttribute('aria-describedby', caption.id);
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'photo-close';
  close.setAttribute('aria-label', 'Close photo');
  close.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  const original = document.createElement('a');
  original.textContent = 'Open original image';
  photoDialog.append(close, image, status, original, caption);
  image.addEventListener('load', () => {
    image.hidden = false;
    status.textContent = '';
    status.hidden = true;
    original.hidden = true;
  });
  image.addEventListener('error', () => {
    image.hidden = true;
    status.hidden = false;
    status.textContent = 'The photo could not be loaded. Try opening the original image.';
    original.hidden = false;
  });
  close.addEventListener('click', closePhoto);
  document.body.append(photoDialog);
  let trigger;
  let closing = false;

  function closePhoto() {
    if (closing || !photoDialog.open) return;
    closing = true;
    photoDialog.classList.add('is-closing');
    setTimeout(() => {
      photoDialog.close();
      photoDialog.classList.remove('is-closing');
      document.documentElement.classList.remove('photo-viewer-open');
      closing = false;
      trigger.focus({ preventScroll: true });
    }, 220);
  }

  for (const link of document.querySelectorAll('.photo-gallery a, .profile-photo-link')) {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      trigger = link;
      image.hidden = true;
      status.hidden = false;
      status.textContent = 'Loading photo…';
      original.href = link.href;
      original.hidden = false;
      image.src = link.href;
      const thumbnail = link.querySelector('img');
      image.alt = thumbnail.alt;
      photoDialog.style.setProperty('--photo-ratio', String(Number(thumbnail.getAttribute('width')) / Number(thumbnail.getAttribute('height'))));
      caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
      photoDialog.showModal();
      document.documentElement.classList.add('photo-viewer-open');
      close.focus({ preventScroll: true });
    });
  }
  photoDialog.addEventListener('click', event => {
    if (event.target === photoDialog) closePhoto();
  });
  photoDialog.addEventListener('cancel', event => {
    event.preventDefault();
    closePhoto();
  });
}
