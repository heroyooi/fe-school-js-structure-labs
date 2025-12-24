export function Section(title, children) {
  const section = document.createElement('section');

  const h2 = document.createElement('h2');
  h2.textContent = title;

  section.appendChild(h2);
  children.forEach((el) => section.appendChild(el));

  return section;
}
