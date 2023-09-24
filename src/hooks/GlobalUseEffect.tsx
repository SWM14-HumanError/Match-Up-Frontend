import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import authControl from '../constant/authControl.ts';

function GlobalUseEffect() {
  const location = useLocation();

  // On every route change
  useEffect(() => {
    window.scrollTo(0, 0);
    authControl.signalLoginState();
    authControl.showAdditionalInfoDialog();
  }, [location]);

  return null;
}

export default GlobalUseEffect;