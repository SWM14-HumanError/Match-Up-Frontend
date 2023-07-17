import {FormEvent, useState} from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function useAuth() {
    return {
      login: async (email: string, password: string) => {
        console.log('login', email, password);
      },
    };
  }

  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await login(email, password);
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;