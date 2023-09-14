import authControl from './authControl.ts';

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

    if (response.status >= 400) {
      let error;
      try {
        error = await response.json();

        // 백에서 정의 된 에러 처리
        switch (error.code) {
          case 'G-001': case 'G-003':
          case 'T-S-001': case 'T-S-002': case 'T-S-003': case 'T-S-004':
          case 'F-S-001': case 'F-S-002': case 'F-S-003':
          case 'TU-S-001':
            alert(error.message);
            console.error(error);
            break;
          case 'G-005': // 토큰 없음
            window.location.href = '/login';
            break;
          case 'G-004': // 잘못된(유효하지 않은) 토큰
            authControl.get403Error();
            break;
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
      return;

    return await response.json();
  },
  
};