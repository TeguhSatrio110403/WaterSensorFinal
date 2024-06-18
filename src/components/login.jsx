import React, { useState } from 'react';
import { redirect } from 'react-router-dom'; // Import useHistory from react-router-dom
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Menginisialisasi useNavigate

  const onSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      username: username,
      password: password
    };

    axios.post('http://localhost:3000/login', dataToSend)
      .then(response => {
        console.log('POST request successful:', response);
        localStorage.setItem('isLoggedIn', true);
        console.log(response.status)
        if (response.status === 200) {
          navigate('/dashboard'); // Redirect menggunakan navigate function
        }else{
          return;
        }
      })
      .catch(error => {
        console.error('Error sending POST request:', error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Username or password is incorrect');
        } else {
          setErrorMessage('An error occurred during login');
        }
      });
      
console.log(response)

     
  };

  return (
    <div>
      <div className="login">
        <h1>LOGIN</h1>
        <img src="./Security-pana.svg" alt="Security Icon" />

        <form onSubmit={onSubmit} method="post">
          <div className="form-input">
            <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" required />
            <span></span>
            <label><b>Username</b></label>
          </div>

          <div className="form-input">
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required />
            <span></span>
            <label><b>Password</b></label>
          </div>
          <input type="submit" name="login" />
        </form>
        <a href="./home"><p>Home</p></a>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;