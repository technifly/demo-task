
import React, { useContext, useState } from 'react';
import { TypeContext } from './../Context/TypeContext';



const Login = () => {
 
  const { login } = useContext(TypeContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = (username,password) => {
    try {
       
      login(username, password);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>User</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
       
    </div>
  );
};

export default Login;
