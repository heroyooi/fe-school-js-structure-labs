/**
 * Lesson 07 Assignment
 * 요구사항:
 * - hash 라우팅(/home, /posts)
 * - theme(전역 유지) : store + localStorage persist
 * - postsQuery(복원) : localStorage restore
 */

// ---------------------
// Store
// ---------------------
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  function getState() {
    return state;
  }

  function setState(nextState) {
    state = { ...state, ...nextState };
    listeners.forEach((fn) => fn());
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { getState, setState, subscribe };
}

const store = createStore({
  theme: localStorage.getItem('theme') || 'light'
});


// theme persist
store.subscribe(() => {
  localStorage.setItem('theme', store.getState().theme);
});

// ---------------------
// Router
// ---------------------
const appEl = document.getElementById('app');

function getRoute() {
  return location.hash.replace('#', '') || '/home';
}

window.addEventListener('hashchange', renderRoute);

// ---------------------
// Pages
// ---------------------
function HomePage() {
  const section = document.createElement('section');
  const { theme } = store.getState();

  section.innerHTML = `
    <h2>Home</h2>
    <p>Theme: <strong>${theme}</strong></p>
    <button id="toggleTheme" type="button">Toggle Theme</button>
    <p>theme은 전역 상태이며 페이지 이동 후에도 유지됩니다.</p>
  `;

  section.querySelector('#toggleTheme').addEventListener('click', () => {
    const next = theme === 'light' ? 'dark' : 'light';
    store.setState({ theme: next });
  });

  return section;
}

function PostsPage() {
  const section = document.createElement('section');
  const savedQuery = localStorage.getItem('postsQuery') || '';

  section.innerHTML = `
    <h2>Posts</h2>
    <input id="search" placeholder="search..." value="${savedQuery}" />
    <p>검색어는 페이지 이동 후에도 복원됩니다.</p>
  `;

  const input = section.querySelector('#search');
  input.addEventListener('input', () => {
    localStorage.setItem('postsQuery', input.value);
  });

  return section;
}

// ---------------------
// Render Route
// ---------------------
function renderRoute() {
  appEl.innerHTML = '';

  const route = getRoute();
  const page = route === '/posts' ? PostsPage() : HomePage();

  appEl.appendChild(page);
}

store.subscribe(renderRoute);

renderRoute();
