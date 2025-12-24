import { Section } from '../components/Section.js';
import { Button } from '../components/Button.js';

export function HomePage({ store }) {
  const { theme } = store.getState();

  const text = document.createElement('p');
  text.textContent = `Theme: ${theme}`;

  const toggleBtn = Button('Toggle Theme', () => {
    const next = store.getState().theme === 'light' ? 'dark' : 'light';
    store.setState({ theme: next });
  });

  const hint = document.createElement('p');
  hint.textContent = 'theme은 전역 상태이며 페이지 이동 후에도 유지됩니다.';

  return Section('Home', [text, toggleBtn, hint]);
}
