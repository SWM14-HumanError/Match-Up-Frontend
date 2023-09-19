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

    const debounceTimer = setTimeout(() => {
      setNicknameAvailable(FetchStatus.LOADING);
      Api.fetch('/api/v1/profile/unique' + Api.getParamString({nickname: nickname}))
        .then((response) =>
          setNicknameAvailable(response?.ok ? FetchStatus.SUCCESS : FetchStatus.FAILURE)
        )
        .catch(() => setNicknameAvailable(FetchStatus.FAILURE));
    }, 800);

    return () => clearTimeout(debounceTimer);
  }, [nickname]);
  
  return nicknameAvailable;
}

export default useUniqueNickname;