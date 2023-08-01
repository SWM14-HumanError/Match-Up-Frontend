import {Navigate, useParams} from 'react-router-dom';

function LoginToken() {
  const params = useParams();

  const token = params.token;
  const redirectUrl = localStorage.getItem('redirectUrl');

  if (token)
    document.cookie = `token=${token}; path=/;`;

  if (redirectUrl)
    localStorage.removeItem('redirectUrl');

  if (redirectUrl)
    return ( <Navigate to={redirectUrl}/> );
  return ( <Navigate to='/'/> );
}

export default LoginToken;