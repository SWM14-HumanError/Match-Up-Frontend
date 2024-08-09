import {useEffect, useState} from 'react';
import {Location, useLocation, useNavigate} from 'react-router-dom';
import ApplyDenyContentsDialog from '@components/dialogLayout/ApplyDenyContentsDialog.tsx';
import authControl from '@constant/authControl.ts';
import {MAP_ROUTE} from '@constant/Routes.tsx';
import Alert from '@constant/Alert.ts';

function GlobalUseEffect() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState<boolean>(false);
  const [refuseId, setRefuseId] = useState<number>(-1);

  // Only Change location pathname
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // On every route change
  useEffect(() => {
    authControl.signalLoginState();
    // authControl.showAdditionalInfoDialog();

    // 권한 확인 부분 추가
    const auths = getLocationAuth(location);

    if (!authControl.canAvailableRole(auths)) {
      if (!authControl.isTokenValid()) {
        Alert.show('로그인이 필요합니다');
        authControl.login();
      }
      else {
        Alert.show('접근 권한이 없습니다');
        navigate('/', {replace: true});
      }
    }


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

// Todo: 더 정확한 string 체크 - 정규식 등
function getLocationAuth(location: Location): string[] {
  const path = location.pathname;
  const routeMapKey = MAP_ROUTE.find(route => path === route.path);
  return routeMapKey ? routeMapKey.auth : ['ALL'];
}

export default GlobalUseEffect;