export function createStore(initialState) {
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

export const store = createStore({
  theme: localStorage.getItem('theme') || 'light'
});

// persist
store.subscribe(() => {
  localStorage.setItem('theme', store.getState().theme);
});
