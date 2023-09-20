import {Navigate, useLocation} from 'react-router-dom';
import authControl from '../constant/authControl.ts';

function LoginToken() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get('token');
  const isSignUp = queryParams.get('signup') === 'true';
  const redirectUrl = authControl.getRedirectUrl();

  if (token) authControl.setToken(token);

  // Todo: redirectUrl 을 삭제하면 중간에 string 사라지는 이유 좀 알려주세요
  // if (redirectUrl)
  //   localStorage.removeItem('redirectUrl');

  if (isSignUp)
    return ( <Navigate to='/join'/> );
  return ( <Navigate to={redirectUrl}/> );
}

export default LoginToken;