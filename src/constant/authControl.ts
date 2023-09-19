const authControl = {
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
  getHeader() {
    const token = authControl.getToken();
    let header: object = { 'Content-Type': 'application/json' };

    if (token)
      header = { ...header, Authorization: `Bearer ${token}` };

    return header;
  },
  get403Error: () => {
    const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (authControl.getToken() && refreshToken) {
      const redirectUrl = window.location.href;
      localStorage.setItem('redirectUrl', redirectUrl);

      window.location.href = '/login/token/refresh';
    }
    else {
      alert('권한이 없습니다');
      window.location.href = '/';
    }
  }
}

export default authControl;