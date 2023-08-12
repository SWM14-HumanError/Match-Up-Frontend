import {Navigate} from 'react-router-dom';

function LogoutToken() {
  const redirectUrl = localStorage.getItem('redirectUrl');

  document.cookie = `tokenExpire=${new Date(Date.now())}; path=/`;
  
  if (!!redirectUrl)
    return ( <Navigate to={redirectUrl}/> );
  return ( <Navigate to='/'/> );
}

export default LogoutToken;