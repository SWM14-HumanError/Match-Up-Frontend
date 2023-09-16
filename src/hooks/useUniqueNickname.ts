import {useEffect, useState} from 'react';
import Api from '../constant/Api.ts';

export enum FetchStatus {
  IDLE,
  LOADING,
  SUCCESS,
  FAILURE
}

function useUniqueNickname(
  nickname: string,
) {
  const [nicknameAvailable, setNicknameAvailable] = useState<FetchStatus>(FetchStatus.IDLE);

  useEffect(() => {
    setNicknameAvailable(FetchStatus.IDLE);
    if (!nickname) return;
    // TODO: 적용 안되는 특수문자 있으면 알려주기

    const debounceTimer = setTimeout(() => {
      setNicknameAvailable(FetchStatus.LOADING);
      Api.fetch('/api/v1/profile/unique' + Api.getParamString({nickname: nickname}))
        .then(() => setNicknameAvailable(FetchStatus.SUCCESS))
        .catch(() => setNicknameAvailable(FetchStatus.FAILURE));
    }, 800);

    return () => clearTimeout(debounceTimer);
  }, [nickname]);
  
  return nicknameAvailable;
}

export default useUniqueNickname;