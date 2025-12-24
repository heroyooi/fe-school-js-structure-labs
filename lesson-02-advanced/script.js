/**
 * Lesson 02 Advanced - Tabs
 * 핵심 규칙:
 * 1) 이벤트에서는 상태만 변경
 * 2) DOM 변경은 render()에서만 처리
 */

// 1) 상태
const state = {
  activeIndex: 0
};

// 2) DOM 참조
const tabsEl = document.getElementById('tabs');
const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.panel'));

// 3) 이벤트(위임): 상태만 변경
tabsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab');
  if (!btn) return;

  state.activeIndex = Number(btn.dataset.index);
  render();
});

// 4) 렌더링: 상태에 맞게 DOM 갱신
function render() {
  tabs.forEach((tab) => {
    const idx = Number(tab.dataset.index);
    tab.classList.toggle('active', idx === state.activeIndex);
  });

  panels.forEach((panel) => {
    const idx = Number(panel.dataset.index);
    panel.style.display = idx === state.activeIndex ? 'block' : 'none';
  });
}

// 5) 초기 렌더
render();
