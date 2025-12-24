/**
 * Lesson 05 Assignment
 * 요구사항:
 * - isLoading 대신 status 사용: idle/loading/success/error
 * - error 상태에서만 Retry 버튼 보이기
 * - loading 중 중복 요청 방지(버튼 비활성화)
 * - 이벤트는 액션만 호출, DOM 변경은 render()에서만
 */

// ---------------------
// State
// ---------------------
const state = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  posts: [],
  error: ''
};

// ---------------------
// DOM
// ---------------------
const loadBtn = document.getElementById('load');
const retryBtn = document.getElementById('retry');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const listEl = document.getElementById('list');

// ---------------------
// Action
// ---------------------
async function loadPosts() {
  // 중복 요청 방지
  if (state.status === 'loading') return;

  state.status = 'loading';
  state.error = '';
  render();

  try {
    const posts = await mockFetchPosts();
    state.posts = posts;
    state.status = 'success';
  } catch (err) {
    state.posts = [];
    state.error = '데이터를 불러오지 못했습니다.';
    state.status = 'error';
  } finally {
    render();
  }
}

// ---------------------
// Events
// ---------------------
loadBtn.addEventListener('click', loadPosts);
retryBtn.addEventListener('click', loadPosts);

// ---------------------
// Render
// ---------------------
function render() {
  // loading
  loadingEl.style.display = state.status === 'loading' ? 'block' : 'none';

  // error
  errorEl.textContent = state.status === 'error' ? state.error : '';

  // list
  if (state.status === 'success') {
    listEl.innerHTML = state.posts.map((p) => `<li>${p.title}</li>`).join('');
  } else {
    listEl.innerHTML = '';
  }

  // Retry 버튼은 error일 때만 표시
  retryBtn.style.display = state.status === 'error' ? 'inline-block' : 'none';

  // loading 중 버튼 비활성화
  const disabled = state.status === 'loading';
  loadBtn.disabled = disabled;
  retryBtn.disabled = disabled;
}

// ---------------------
// Mock API
// ---------------------
function mockFetchPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error('Network Error'));
        return;
      }

      resolve([
        { id: 1, title: 'Post A' },
        { id: 2, title: 'Post B' },
        { id: 3, title: 'Post C' }
      ]);
    }, 700);
  });
}

// 초기 렌더
render();
