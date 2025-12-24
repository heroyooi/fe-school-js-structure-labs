// 1) 상태
const state = {
  activeIndex: 0
};

// 2) DOM 참조
const tabsEl = document.getElementById('tabs');
const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.panel'));

// 3) 이벤트 위임: 부모(#tabs)에만 등록
tabsEl.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;

  // ✅ 이벤트에서는 상태만 변경
  state.activeIndex = Number(tab.dataset.index);

  // ✅ 화면 변경은 render에게 위임
  render();
});

// 4) render()에서만 DOM 변경
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
