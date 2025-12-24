import { store } from './core/store.js';
import { createRouter } from './core/router.js';
import { HomePage } from './pages/HomePage.js';
import { PostsPage } from './pages/PostsPage.js';

const appEl = document.getElementById('app');

function renderRoute() {
  appEl.innerHTML = '';

  const route = router.getRoute();
  const page =
    route === '/posts'
      ? PostsPage({ store })
      : HomePage({ store });

  appEl.appendChild(page);
}

const router = createRouter({
  onRouteChange: renderRoute
});

// 전역 상태(theme) 변경 시 현재 화면 다시 렌더
store.subscribe(renderRoute);

// 초기 렌더
renderRoute();
