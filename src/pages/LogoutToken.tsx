import {Navigate} from 'react-router-dom';
// import authControl from '../constant/authControl.ts';

function LogoutToken() {
  // const redirectUrl = authControl.getRedirectUrl();
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // document.cookie = `tokenExpire=${new Date(Date.now())}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  
  // if (!!redirectUrl)
  //   return ( <Navigate to={redirectUrl}/> );
  return ( <Navigate to='/'/> );
}

export default LogoutToken;