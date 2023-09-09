import authControl from "./authControl.ts";

export default {
  async fetch(url: string, method: string = 'GET', body: any = {}) {
    let reqData :object = {
      method: method,
      headers: authControl.getHeader(),
    }
    if (method !== 'GET')
      reqData = {
        ...reqData,
        body: JSON.stringify(body),
      }

    const response = await fetch(url, reqData);

    if (response.status === 401) {
      window.location.href = '/login';
      throw {};
    }
    else if (response.status === 403) {
      authControl.get403Error();
      throw {};
    }
    else if (response.status >= 400) {
      throw {};
    }

    return await response.json();
  }
};