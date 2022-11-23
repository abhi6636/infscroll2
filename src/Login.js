import React from 'react';
import { useNavigate } from 'react-router';
import './styles/Login.css';
const Login = () => {
  let navigate = useNavigate();

  const [data, setData] = React.useState({
    username: '',
    password: '',
  });

  const [error, setError] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (data.username === '' || data.password === '') {
      setError(true);
      return;
    }
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/home');
  };

  return (
    <div className='login-screen'>
      <div>
      <h1 className='loginhead'><img src='https://cdn-icons-png.flaticon.com/512/6681/6681204.png' width="60" height="60" alt='loginimg'/> Please Login</h1>
      </div>
      <div className='input-container'>
        <label htmlFor='username'>Username</label>
        <input
          name='username'
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      {error && <p className='invalid'>Please enter your login credentials</p>}
      <button onClick={handleClick}> login </button>
    </div>
  );
};

export default Login;
