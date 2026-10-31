const photoDialog = document.createElement('dialog');
if (typeof photoDialog.showModal === 'function') {
  photoDialog.className = 'photo-lightbox';
  photoDialog.setAttribute('aria-label', 'Photo viewer. Press Escape or click outside the photo to close.');
  photoDialog.tabIndex = -1;
  const image = document.createElement('img');
  const caption = document.createElement('p');
  caption.id = 'lightbox-caption';
  photoDialog.setAttribute('aria-describedby', caption.id);
  photoDialog.append(image, caption);
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
      image.src = link.href;
      const thumbnail = link.querySelector('img');
      image.alt = thumbnail.alt;
      photoDialog.style.setProperty('--photo-ratio', String(Number(thumbnail.getAttribute('width')) / Number(thumbnail.getAttribute('height'))));
      caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
      photoDialog.showModal();
      document.documentElement.classList.add('photo-viewer-open');
      photoDialog.focus({ preventScroll: true });
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
