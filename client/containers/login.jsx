import React, { useRef, useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';

const Login = () => {
  const [login, setLogin] = useState(true);
  useEffect(() => {}, []);
  return (
    <div>
      <Nav />
      {login ? (
        //if they want to login
        <div>
          <input placeholder='email'></input>
          <input placeholder='password'></input>
          <button onClick={() => console.log('submit!')}>Submit</button>
          <a onClick={() => setLogin(false)}>Don't have an account?</a>
        </div>
      ) : (
        //if they want to sign up
        <div>
          <input placeholder='email'></input>
          <input placeholder='password'></input>
          <input placeholder='confirm password'></input>
          <button onClick={() => console.log('submit!')}>Submit</button>
          <a onClick={() => setLogin(true)}>Already have an account?</a>
        </div>
      )}
    </div>
  );
};

export default Login;
