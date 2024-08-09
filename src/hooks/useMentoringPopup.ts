import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {IMentoring} from '@constant/interfaces.ts';

export enum FetchStatus {
  IDLE,
  LOADING,
  SUCCESS,
  FAILURE
}

function useMentoringPopup(MentoringArr: (IMentoring|null)[]) {
  const location = useLocation();
  const paramObj = new URLSearchParams(location.search);

  const [selectedMentoringId, setSelectedMentoringId] = useState<number>(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (paramObj.has('mentoringId')) {
      const mentoringId = parseInt(paramObj.get('mentoringId') ?? '');
      if (!isNaN(mentoringId))
        selectMentor(mentoringId);
    }
  }, [paramObj]);

  function selectMentor(mentoringId: number) {
    setSelectedMentoringId(mentoringId);
    setSelectedCardIndex(MentoringArr.findIndex(
      (v :IMentoring|null) => v && v.mentoringId === mentoringId));
    setIsOpen(true);
  }

  return {isOpen, setIsOpen, mentoringId:selectedMentoringId, selectedCardIndex};
}

export default useMentoringPopup;