import Api from './Api.ts';
import Alert from './Alert.ts';
import {MAP_ROUTE} from './Routes.tsx';

export const RefreshRequestMaxCount = 2;

// @ts-ignore
const authControl = {
  setToken: (token: string) => {
    const info = getJWTJson(token);
    if (!info) return;

    document.cookie = `token=${token}; expires=${new Date(info.exp * 1000)}; path=/`;
  },
  getToken: () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (token) {
      const {exp} = getJWTJson(token);

      const now = new Date();
      const expire = new Date(exp * 1000);

      if (now < expire)
        return token;
    }

    if (token)
      authControl.updateToken();

    return null;
  },
  updateToken: () => {
    fetch('/api/v1/login/token/refresh')
      .then(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
        authControl.setToken(token);
      });
  },
  // document.cookie 에서 token, refreshToken 외 모두 삭제
  retainAuthTokenOnly: () => {
    const cookies = document.cookie.split(';');

    cookies.forEach((cookie) => {
      const key = cookie.split('=')[0].trim();
      if (key === 'token' || key === 'refresh_token') return;
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  },
  getInfoFromToken: () => {
    const token = authControl.getToken();
    if (!token) return null;

    return getJWTJson(token);
  },
  isTokenValid: () => {
    const info = authControl.getInfoFromToken();
    return info ? info.exp * 1000 > new Date().getTime() : false;
  },
  getUserIdFromToken: () => {
    const info = authControl.getInfoFromToken();
    return info ? info.id : 0;
  },
  getHeader() {
    const token = authControl.getToken();
    let header: object = {'Content-Type': 'application/json'};

    if (token)
      header = {...header, Authorization: token};

    return header;
  },
  get403Error: async (url: string, method: string = 'GET', body: any = {}, reqLimit: number = RefreshRequestMaxCount): Promise<Response | undefined> => {
    const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (authControl.getToken() && refreshToken) {
      const req = await fetch('/api/v1/login/token/refresh');

      if (req.status >= 400) {
        // Todo: console 지우기
        console.error(req.status, req.body, await req.text());
        Alert.show('로그인이 필요합니다');
        authControl.login();
        throw await req.json();
      }

      // const accessToken = await req.text();
      const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      authControl.setToken(accessToken);

      if (reqLimit <= 0)
        return;
      return await Api.fetch(url, method, body, reqLimit - 1);
    } else {
      Alert.show('권한이 없습니다');
      window.location.href = '/';
    }
  },
  login() {
    authControl.saveCurrentUrl();
    window.location.href = '/login';
  },
  logout() {
    authControl.saveCurrentUrl();
    window.location.href = '/logout';
  },
  saveCurrentUrl() {
    const redirectUrl = window.location.href;
    localStorage.setItem('redirectUrl', redirectUrl);
  },
  canAvailableRole(auths: string[]) {
    const info = authControl.getInfoFromToken();
    const role = info ? info.role : '';

    return auths.some(auth => {
      switch (auth) {
        case 'ALL':
          return true;
        case 'LOGIN':
          return !!auth;
        default:
          return role === auth;
      }
    });
  },
  getRedirectUrl() {
    const redirectUrl = localStorage.getItem('redirectUrl');
    const location = redirectUrl?.split('/').slice(3).join('/');
    const RedirectLoc = location ? `/${location}` : '/';

    // Route 중 가장 긴 path를 가진 route를 찾음
    const routeMapKey = MAP_ROUTE.reduce((longestMatch, route) => {
      const routePath = route.path.split(/[:?#]/)[0];
      if (RedirectLoc.startsWith(routePath) && routePath.length > longestMatch.path.length) {
        return route;
      }
      return longestMatch;
    }, MAP_ROUTE[0]);

    if (!routeMapKey || !this.canAvailableRole(routeMapKey.auth))
      return '/';
    return RedirectLoc;
  },
  /** 로그인 시 프로필 변경 알림을 조건을 확인하고 띄워주는 함수 */
  signalLoginState() {
    if (!authControl.getToken()) return;

    const prevTimeString = sessionStorage.getItem('loginRefreshTime');
    const prevTime = prevTimeString ? new Date(prevTimeString).getTime() : 0;
    const now = new Date().getTime();
    const MINUTE = 1000 * 60;

    if (prevTime === 0)
      sessionStorage.setItem('loginRefreshTime', new Date(now).toString());
    else if (now - prevTime > 30 * MINUTE) {
      Api.fetch('/api/v1/user/online').then(res => {
        if (res?.ok)
          sessionStorage.setItem('loginRefreshTime', new Date().toString());
      });
    }
  },
}

function getJWTJson(token: string) {
  const base64Url = token.split('.')[1];
  if (!base64Url) return null;

  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export default authControl;