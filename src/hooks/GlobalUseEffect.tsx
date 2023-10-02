import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ApplyDenyContentsDialog from '../components/dialogLayout/ApplyDenyContentsDialog.tsx';
import authControl from '../constant/authControl.ts';

function GlobalUseEffect() {
  const location = useLocation();
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState<boolean>(false);
  const [refuseId, setRefuseId] = useState<number>(-1);

  // On every route change
  useEffect(() => {
    window.scrollTo(0, 0);
    authControl.signalLoginState();
    authControl.showAdditionalInfoDialog();

    const params = new URLSearchParams(location.search);
    if (params.has('modal') && params.get('modal') === 'denyContents') {
      const refuseId = Number(params.get('refuseID') ?? '-1');

      setRefuseId(refuseId);
      setIsApplyDialogOpen(refuseId > 0);
    }
  }, [location]);

  return (
    <ApplyDenyContentsDialog refuseId={refuseId} isOpen={isApplyDialogOpen} setIsOpen={setIsApplyDialogOpen} />
  );
}

export default GlobalUseEffect;