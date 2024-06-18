import React, { useState } from 'react';
import axios from 'axios';

const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const onSubmit = (e) => {

    const dataToSend = {
      username: username,
      password: password
    };

    axios.post('http://localhost:3000/login', dataToSend)
      .then(response => {
        console.log('POST request successful:', response.data);
        // Handle response if needed, e.g., redirect to dashboard
        localStorage.setItem('isLoggedIn', true);
        location.href = "/dashboard";
      })

      .catch(error => {
        console.error('Error sending POST request:', error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Username or password is incorrect');
          e.preventDefault();
        } else {
          setErrorMessage('An error occurred during login');
          e.preventDefault();
        }
    e.preventDefault(); // Prevent default form submission behavior
      });
        
  };

  return (
    <div>
      <div className="login">
        <h1>LOGIN</h1>
        <img src="./Security-pana.svg" alt="Security Icon" />

        <form  onSubmit={onSubmit}>
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

export default login;