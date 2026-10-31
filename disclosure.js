if (typeof Element.prototype.animate === 'function') {
  for (const details of document.querySelectorAll('details')) {
    const summary = details.querySelector('summary');
    const content = document.createElement('div');
    content.className = 'disclosure-content';
    while (summary.nextSibling) content.append(summary.nextSibling);
    details.append(content);
    let animation = null;
    let expanded = details.open;

    summary.addEventListener('click', event => {
      event.preventDefault();
      expanded = !expanded;
      const from = details.open ? content.getBoundingClientRect().height : 0;
      const opacity = details.open ? getComputedStyle(content).opacity : '0';
      if (animation) animation.cancel();
      details.open = true;
      content.style.overflow = 'clip';
      animation = content.animate([
        { height: `${from}px`, opacity },
        { height: `${expanded ? content.scrollHeight : 0}px`, opacity: expanded ? 1 : 0 }
      ], { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' });
      summary.setAttribute('aria-expanded', String(expanded));
      animation.onfinish = () => {
        details.open = expanded;
        animation.cancel();
        animation = null;
        content.style.removeProperty('overflow');
        summary.removeAttribute('aria-expanded');
      };
    });
  }
}
