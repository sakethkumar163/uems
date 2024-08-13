import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    if (!username || !password) {
      setError('Please enter both username and password.');
    } else if (error) {
      setError('Invalid credentials');
    }
    else{
        setError('');
        setUsername('');
        setPassword('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button type='submit' style={{ padding: '8px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
