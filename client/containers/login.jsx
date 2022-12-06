import React, { useRef, useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../rootReducer.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div>
      {login ? (
        //if they want to login
        <div>
          <input placeholder='email'></input>
          <input placeholder='password'></input>
          <button
            onClick={() => {
              dispatch(loginAction());
              navigate('/');
            }}
          >
            Submit
          </button>
          <a onClick={() => setLogin(false)}>Don't have an account?</a>
        </div>
      ) : (
        //if they want to sign up
        <div>
          <input placeholder='email'></input>
          <input placeholder='password'></input>
          <input placeholder='confirm password'></input>
          <button
            onClick={() => {
              dispatch(loginAction());
              navigate('/profile');
            }}
          >
            Submit
          </button>
          <a onClick={() => setLogin(true)}>Already have an account?</a>
        </div>
      )}
    </div>
  );
};

export default Login;
