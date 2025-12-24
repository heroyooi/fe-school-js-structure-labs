/**
 * Lesson 06
 * 전역 상태(store) + subscribe 기본 구조
 */

// ---------------------
// Store 생성 함수
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

// ---------------------
// 전역 Store 생성
// ---------------------
const store = createStore({
  user: null // 로그인 전: null, 로그인 후: { name: 'SYW' }
});

// ---------------------
// DOM
// ---------------------
const headerEl = document.getElementById('header');
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');

// ---------------------
// Render (구독 대상)
// ---------------------
function renderHeader() {
  const { user } = store.getState();
  headerEl.textContent = user ? `Hello, ${user.name}` : 'Guest';
}

// 모든 렌더를 한 번에 묶어도 됨
function renderAll() {
  renderHeader();
}

// ---------------------
// Events → Action(setState)
// ---------------------
loginBtn.addEventListener('click', () => {
  store.setState({ user: { name: 'SYW' } });
});

logoutBtn.addEventListener('click', () => {
  store.setState({ user: null });
});

// ---------------------
// Subscribe
// ---------------------
store.subscribe(renderAll);

// ---------------------
// Initial Render
// ---------------------
renderAll();
