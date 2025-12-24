/**
 * Lesson 02
 * 상태 기반 렌더링 실습
 */

// 1️⃣ 상태 정의
const state = {
  isActive: false
};

// 2️⃣ DOM 참조
const toggleBtn = document.getElementById('toggleBtn');
const box = document.getElementById('box');

// 3️⃣ 이벤트는 상태만 변경
toggleBtn.addEventListener('click', () => {
  state.isActive = !state.isActive;
  render();
});

// 4️⃣ 화면 변경은 render 함수에서만 처리
function render() {
  if (state.isActive) {
    box.classList.add('active');
  } else {
    box.classList.remove('active');
  }
}

// 5️⃣ 초기 렌더링
render();
