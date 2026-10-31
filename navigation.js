const navigation = document.querySelector('nav');

function updateNavigationOffset() {
  const offset = navigation.getBoundingClientRect().height + 16;
  document.documentElement.style.setProperty('--navigation-offset', `${offset}px`);
}

new ResizeObserver(updateNavigationOffset).observe(navigation);
updateNavigationOffset();

const navigationLinks = [...document.querySelectorAll('nav div a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

function updateCurrentSection() {
  const readingLine = Math.max(navigation.getBoundingClientRect().bottom + 16, window.innerHeight * 0.35);
  let currentSection = null;

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) {
      currentSection = section;
    }
  }

  // The final section may be too short to reach the reading line.
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    currentSection = sections[sections.length - 1];
  }

  for (const link of navigationLinks) {
    if (currentSection && link.hash === `#${currentSection.id}`) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

let updateScheduled = false;
window.addEventListener('scroll', () => {
  if (updateScheduled) return;
  updateScheduled = true;
  requestAnimationFrame(() => {
    updateCurrentSection();
    updateScheduled = false;
  });
}, { passive: true });
window.addEventListener('resize', updateCurrentSection);
window.addEventListener('pageshow', updateCurrentSection);
updateCurrentSection();
