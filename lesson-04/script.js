/**
 * Lesson 04
 * 역할 분리 기본 예제
 *
 * 규칙:
 * 1) 이벤트 핸들러에서는 DOM을 직접 수정하지 않는다
 * 2) 상태 변경은 Action 함수에서만
 * 3) DOM 변경은 render()에서만
 */

// ---------------------
// State
// ---------------------
const state = {
  count: 0
};

// ---------------------
// DOM
// ---------------------
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const countEl = document.getElementById('count');

// ---------------------
// Actions (상태 변경)
// ---------------------
function increase() {
  state.count += 1;
  render();
}

function decrease() {
  state.count -= 1;
  render();
}

// ---------------------
// Events (액션 호출)
// ---------------------
plusBtn.addEventListener('click', increase);
minusBtn.addEventListener('click', decrease);

// ---------------------
// Render (DOM 갱신)
// ---------------------
function render() {
  countEl.textContent = String(state.count);
}

// ---------------------
// Initial Render
// ---------------------
render();
