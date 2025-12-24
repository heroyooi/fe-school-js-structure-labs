/**
 * Lesson 03
 * - 이벤트 버블링 확인
 * - 이벤트 위임(Event Delegation) 실습
 */

// -------------------------
// 실습 1) 버블링 확인
// -------------------------
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', () => {
  console.log('parent');
});

child.addEventListener('click', () => {
  console.log('child');
});

// ✅ 실습 1-추가(선택)
// 아래 주석을 풀면 child 클릭 시 parent가 찍히지 않습니다.
// child.addEventListener('click', (e) => {
//   e.stopPropagation();
//   console.log('child (stopPropagation)');
// });


// -------------------------
// 실습 2) 이벤트 위임
// -------------------------
const tabsEl = document.getElementById('tabs');
const logEl = document.getElementById('log');

tabsEl.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;

  const index = tab.dataset.index;
  logEl.textContent = `clicked: ${index}`;
  console.log('delegation index:', index);
});
