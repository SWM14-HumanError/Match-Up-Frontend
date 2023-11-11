import {Navigate} from 'react-router-dom';
// import authControl from '../constant/authControl.ts';

function LogoutToken() {
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

  //   return ( <Navigate to={authControl.getRedirectUrl()}/> );
  return ( <Navigate to='/'/> );
}

export default LogoutToken;