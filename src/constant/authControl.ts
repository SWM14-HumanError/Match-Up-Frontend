import Api from './Api.ts';

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
  get403Error: async (url: string, method: string = 'GET', body: any = {}): Promise<Response | undefined> => {
    const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (authControl.getToken() && refreshToken) {
      const req = await fetch('/login/token/refresh');

      if (req.status >= 400) {
        alert('로그인이 필요합니다');
        authControl.login();
        throw await req.json();
      }

      const accessToken = await req.text();
      authControl.setToken(accessToken);

      return await Api.fetch(url, method, body);
    }
    else {
      alert('권한이 없습니다');
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
    return location ? `/${location}` : '/';
  }
}

export default authControl;