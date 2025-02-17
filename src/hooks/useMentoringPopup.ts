import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {IMentoring} from '@constant/interfaces.ts';

// export enum FetchStatus {
//   IDLE,
//   LOADING,
//   SUCCESS,
//   FAILURE
// }

function useMentoringPopup(MentoringArr: (IMentoring|null)[]) {
  const location = useLocation();

  const {mentoringId, selectedCardIndex} = useMemo(() => {
    const params = new URLSearchParams(location.search);

    const mentoringId = parseInt(params.get('mentoringId') ?? '-1');
    
    const selectedCardIndex = MentoringArr.findIndex(
      (v :IMentoring|null) => v && v.mentoringId === mentoringId);

    return {mentoringId, selectedCardIndex};
  }, [MentoringArr, location.search]);

  const isOpen = mentoringId >= 0;

  return {isOpen, mentoringId, selectedCardIndex};
}

export default useMentoringPopup;