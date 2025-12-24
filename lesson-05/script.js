/**
 * Lesson 05
 * 데이터 요청의 3상태(Loading / Success / Error)를
 * state로 관리하는 기본 구조
 */

// ---------------------
// State
// ---------------------
const state = {
  isLoading: false,
  posts: [],
  error: ''
};

// ---------------------
// DOM
// ---------------------
const reloadBtn = document.getElementById('reload');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const listEl = document.getElementById('list');

// ---------------------
// Action (비동기 포함)
// ---------------------
async function loadPosts() {
  // 로딩 시작
  state.isLoading = true;
  state.error = '';
  render();

  try {
    const posts = await mockFetchPosts();
    state.posts = posts;
  } catch (err) {
    state.error = '데이터를 불러오지 못했습니다.';
    state.posts = [];
  } finally {
    // 로딩 종료
    state.isLoading = false;
    render();
  }
}

// ---------------------
// Event
// ---------------------
reloadBtn.addEventListener('click', loadPosts);

// ---------------------
// Render
// ---------------------
function render() {
  // 로딩 표시
  loadingEl.style.display = state.isLoading ? 'block' : 'none';

  // 에러 표시
  errorEl.textContent = state.error;

  // 리스트 렌더
  listEl.innerHTML = state.posts
    .map((post) => `<li>${post.title}</li>`)
    .join('');
}

// ---------------------
// Mock API
// ---------------------
function mockFetchPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 30% 확률로 실패
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

// ---------------------
// Initial Render
// ---------------------
render();
