import {Navigate, useParams} from 'react-router-dom';

function LoginToken() {
  const params = useParams();

  const token = params.token;
  const redirectUrl = localStorage.getItem('redirectUrl');

  if (token)
    document.cookie = `token=${token}; tokenExpire=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)}; path=/`;

  // Todo: redirectUrl 을 삭제하면 중간에 string 사라지는 이유 좀 알려주세요
  // if (redirectUrl)
  //   localStorage.removeItem('redirectUrl');

  if (!!redirectUrl)
    return ( <Navigate to={redirectUrl}/> );
  return ( <Navigate to='/'/> );
}

export default LoginToken;