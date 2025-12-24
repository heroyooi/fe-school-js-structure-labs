import { store } from './core/store.js';
import { createRouter } from './core/router.js';
import { HomePage } from './pages/HomePage.js';
import { PostsPage } from './pages/PostsPage.js';

const appEl = document.getElementById('app');

function render() {
  appEl.innerHTML = '';

  const route = router.getRoute();
  const page =
    route === '/posts'
      ? PostsPage()
      : HomePage({ store });

  appEl.appendChild(page);
}

const router = createRouter(render);

// 전역 상태 변경 시 재렌더
store.subscribe(render);

// 최초 렌더
render();
