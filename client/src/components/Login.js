import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useHistory();

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const login = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", {username, password})
    .then(res => {
      console.log(res);
      window.localStorage.setItem("token", JSON.stringify(res.data.payload));
      push("/bubbles");
    })
    .catch(err => {
      setUsername("");
      setPassword("");
    });

  }
  return (
    <div className="login-page">
      <h1>Welcome to the Bubble App!</h1>   
      <form onSubmit={login}>
        <input onChange={handleUsernameChange} type="text" id="username" name="username" placeholder="username" value={username}/>
        <input onChange={handlePasswordChange} type="text" id="password" name="password" placeholder="password" value={password}/>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;