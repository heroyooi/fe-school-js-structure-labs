/**
 * Lesson 04 Assignment
 * 요구사항:
 * - reset() 액션 추가
 * - count는 0 미만으로 내려가지 않게
 * - 상태 변경은 Action에서만
 * - DOM 변경은 render()에서만
 */

// ---------------------
// State
// ---------------------
const state = {
  count: 0,
  message: ''
};

// ---------------------
// DOM
// ---------------------
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const resetBtn = document.getElementById('reset');
const countEl = document.getElementById('count');
const msgEl = document.getElementById('msg');

// ---------------------
// Actions
// ---------------------
function increase() {
  state.count += 1;
  state.message = '';
  render();
}

function decrease() {
  if (state.count === 0) {
    state.message = '0 아래로는 내려갈 수 없습니다.';
    render();
    return;
  }

  state.count -= 1;
  state.message = '';
  render();
}

function reset() {
  state.count = 0;
  state.message = '초기화되었습니다.';
  render();
}

// ---------------------
// Events
// ---------------------
plusBtn.addEventListener('click', increase);
minusBtn.addEventListener('click', decrease);
resetBtn.addEventListener('click', reset);

// ---------------------
// Render
// ---------------------
function render() {
  countEl.textContent = String(state.count);
  msgEl.textContent = state.message;
}


// ---------------------
// Initial Render
// ---------------------
render();
