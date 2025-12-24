/**
 * Lesson 07
 * - Hash Routing
 * - 상태 유지(Persist) / 초기화(Reset) / 복원(Restore)
 */

// ---------------------
// Store (Persist 대상)
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

// 전역 유지 상태: theme
const store = createStore({
  theme: localStorage.getItem('theme') || 'light'
});

// theme 변경 시 localStorage에 persist
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
    <button id="toggleTheme">Toggle Theme</button>
    <p>※ theme은 전역 상태이며 페이지 이동 후에도 유지됩니다.</p>
  `;

  section.querySelector('#toggleTheme').addEventListener('click', () => {
    const next = theme === 'light' ? 'dark' : 'light';
    store.setState({ theme: next });
  });

  return section;
}

function PostsPage() {
  const section = document.createElement('section');

  // Restore 대상: 검색어
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
  let page;

  if (route === '/posts') {
    page = PostsPage();
  } else {
    page = HomePage();
  }

  appEl.appendChild(page);
}

// 전역 상태 변경 시 현재 페이지 다시 렌더
store.subscribe(renderRoute);

// ---------------------
// Initial Render
// ---------------------
renderRoute();
