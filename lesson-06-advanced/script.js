/**
 * Lesson 06 Assignment
 * 요구사항:
 * - createStore 구현
 * - user 전역 상태 관리 (null / {name:'SYW'})
 * - subscribe로 자동 렌더
 * - 이벤트에서는 setState만 호출
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

// ---------------------
// Global Store
// ---------------------
const store = createStore({
  user: null
});

// ---------------------
// DOM
// ---------------------
const headerEl = document.getElementById('header');
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');

// ---------------------
// Render
// ---------------------
function renderHeader() {
  const { user } = store.getState();
  headerEl.textContent = user ? `Hello, ${user.name}` : 'Guest';
}


function renderAll() {
  renderHeader();
}

// ---------------------
// Events
// ---------------------
loginBtn.addEventListener('click', () => {
  store.setState({ user: { name: 'SYW' } });
});

logoutBtn.addEventListener('click', () => {
  store.setState({ user: null });
});


// ---------------------
// Subscribe + Initial
// ---------------------
store.subscribe(renderAll);
renderAll();
