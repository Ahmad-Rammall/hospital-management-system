import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

import "./leftSection.css";

function LeftSection() {
  const [username, setUsername] = useState(0);
  const [password, setPassword] = useState("");
  const [role , setRole] = useState('');

  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:80/Hospital-Management-System/server/signin.php",
        {
          username,
          password,
        }
      );

      const token = response.data;

      //Save token to localstorage
      localStorage.setItem('token',token)

      setRole(JSON.parse(atob(token.split('.')[1])).role)

      switch (role) {
        case "admin":
          navigate('/admin')
          break;
      
        default:
          break;
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container flex column center">
      <form action="" method="POST" onSubmit={login}>
        <div className="input">
          <p>UserID</p>
          <input
            type="text"
            className="input-field"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input">
          <p>Password</p>
          <input
            type="password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Sign In"
          className="login-btn"
        />
      </form>
    </div>
  );
}

export default LeftSection;