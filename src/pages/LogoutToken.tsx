import {Navigate} from 'react-router-dom';
import authControl from '../constant/authControl.ts';

function LogoutToken() {
  const redirectUrl = authControl.getRedirectUrl();
  document.cookie = `tokenExpire=${new Date(Date.now())}; path=/`;
  
  if (!!redirectUrl)
    return ( <Navigate to={redirectUrl}/> );
  return ( <Navigate to='/'/> );
}

export default LogoutToken;