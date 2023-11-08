import {NavigateFunction} from 'react-router-dom';
import authControl, {RefreshRequestMaxCount} from './authControl.ts';
import infScroll from './InfScroll.ts';
import Alert from './Alert.ts';

export default {
  async fetch(url: string, method: string = 'GET', body: any = {}, reqLimit: number = RefreshRequestMaxCount) {
    let reqData :object = {
      method: method,
      headers: authControl.getHeader(),
      credentials: 'omit',
    }
    if (method !== 'GET')
      reqData = {
        ...reqData,
        body: JSON.stringify(body),
      }

    const response = await fetch(url, reqData);

    if (response.status >= 400) {
      let error;
      try {
        error = await response.json();

        // 백에서 정의 된 에러 처리
        switch (error.code) {
          case 'G-001': case 'G-003':
          case 'T-S-003':
          case 'F-S-001': case 'F-S-002': case 'F-S-003':
          case 'TU-S-001': case 'TU-S-003':
            Alert.show(error.message);
            console.error(error);
            break;
          case 'G-008': case 'U-S-002':
            Alert.show(error.message + '\n' + JSON.stringify(error));
            break;
          case 'T-S-002': case 'T-S-004':
            console.error(error);
            break;
          case 'T-S-001':
            // Alert.show(error.message);
            Alert.show(error.message);
            window.location.href = '/';
            break;
          case 'G-005': case 'G-007': case 'U-S-001': // 토큰 없음
            const isDev = window.location.hostname === 'localhost';
            if (isDev) {
              Alert.show(`Dev: 버그가 있습니다.\n${JSON.stringify(error)}`);
            }

            authControl.login();
            break;
          case 'G-006': case 'G-004': // 잘못된(유효하지 않은) / 토큰이 잘못 된 경우
            return authControl.get403Error(url, method, body, reqLimit);
          default:
            console.error('아직 처리되지 않은 예외 입니다', error);
        }
      } catch (e) {
        error = {
          code: '?????',
          message: '존재하지 않는 오류 입니다',
          messageExtra: {
            type: [e]
          }
        };
      }

      throw error;
    }
    else if(response.status === 204)
      return response;

    return response;
  },
  async fetch2Json(url: string, method: string = 'GET', body: any = {}) {
    const response = await this.fetch(url, method, body);
    if (!response || response.status === 204) return {};

    return await response.json();
  },
  getParamString(params: object) {
    const str = infScroll.getParamString(params);
    return str ? '?' + str : '';
  },
  goto404(navigate: NavigateFunction) {
    if (!this.isLocalhost()) {
      navigate('/not-found', {replace: true});
      return true;
    }
    return false;
  },
  isLocalhost() {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }
};