import Api from './Api.ts';
import Alert from './Alert.ts';

export const RefreshRequestMaxCount = 2;

// @ts-ignore
const authControl = {
  setToken: (token: string) => {
    document.cookie = `token=${token}; path=/`;
    document.cookie = `tokenExpire=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)}; path=/`;
  },
  getToken: () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const tokenExpire = document.cookie.replace(/(?:(?:^|.*;\s*)tokenExpire\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (token && tokenExpire) {
      const now = new Date();
      const expire = new Date(tokenExpire);

      if (now < expire)
        return token;
    }

    return null;
  },
  getInfoFromToken: () => {
    const token = authControl.getToken();
    let info = null;

    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      info = JSON.parse(window.atob(base64));
    }
    catch (error) {
      info = null;
    }

    return info;
  },
  getUserIdFromToken: () => {
    const info = authControl.getInfoFromToken();
    return info ? info.id : 0;
  },
  getHeader() {
    const token = authControl.getToken();
    let header: object = { 'Content-Type': 'application/json' };

    if (token)
      header = { ...header, Authorization: token };

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

      const accessToken = await req.text();
      authControl.setToken(accessToken);

      if (reqLimit <= 0)
        return;
      return await Api.fetch(url, method, body, reqLimit - 1);
    }
    else {
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
  getRedirectUrl() {
    const redirectUrl = localStorage.getItem('redirectUrl');
    const location = redirectUrl?.split('/').slice(3).join('/');
    const RedirectLoc = location ? `/${location}` : '/';

    const excludeUrl = [
      '/login',
      '/logout',
      '/login/token',
      '/logout/token',
      '/join',
      '/join/additional-info',
    ];

    if (excludeUrl.includes(RedirectLoc))
      return '/';
    return RedirectLoc;
  },
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
  // showAdditionalInfoDialog() {
  //   const tokenObj = authControl.getInfoFromToken();
  //   if (!tokenObj || !tokenObj.unknown) return;
  //
  //   const prevTimeString = sessionStorage.getItem('tokenRefreshTime');
  //   const prevTime = prevTimeString ? new Date(prevTimeString).getTime() : 0;
  //   const now = new Date().getTime();
  //   const MINUTE = 1000 * 60;
  //
  //   if (prevTime === 0)
  //     sessionStorage.setItem('tokenRefreshTime', new Date(now - 9 * MINUTE).toString());
  //   else if (now - prevTime > 12 * MINUTE) {
  //     if (confirm('회원님의 추가 정보를 입력해주세요\n정보를 입력하면 더 많은 사람들이 볼 수 있습니다'))
  //       window.location.href = '/join/additional-info';
  //     sessionStorage.setItem('tokenRefreshTime', new Date().toString());
  //   }
  // }
}

export default authControl;