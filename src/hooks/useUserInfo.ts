function useUserInfo(nickname: string | null, positionLevel: number | null) {
  return {
    isAvailableUser: !!nickname,
    fixedNickname: nickname ?? '존재하지 않는 사용자',
    fixedPositionLevel: nickname ? positionLevel : null,
  };
}

export default useUserInfo;