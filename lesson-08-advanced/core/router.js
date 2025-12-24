export function createRouter(onRouteChange) {
  function getRoute() {
    return location.hash.replace('#', '') || '/home';
  }

  window.addEventListener('hashchange', onRouteChange);

  return { getRoute };
}
