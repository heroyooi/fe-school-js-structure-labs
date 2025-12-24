import { Section } from '../components/Section.js';
import { TextInput } from '../components/TextInput.js';

export function PostsPage() {
  const savedQuery = localStorage.getItem('postsQuery') || '';

  const input = TextInput(savedQuery, (value) => {
    localStorage.setItem('postsQuery', value);
  });

  const hint = document.createElement('p');
  hint.textContent = '검색어는 페이지 이동 후에도 복원됩니다.';

  return Section('Posts', [input, hint]);
}
