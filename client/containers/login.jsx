import React, { useRef, useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../rootReducer.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const navigate = useNavigate();

  const loginHandle = async (url, type) => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPass;
    let route = '/';
    if (type === 'signup') {
      confirmPass = document.getElementById('confirm-pass').value;
      route = '/profile';
    }
    if (confirmPass && password !== confirmPass) {
      alert('Passwords do not match!');
    } else {
      try {
        const response = await axios.post(url, {
          email: email,
          password: password,
        });
        if (response.status === 200) {
          const userData = await response.data.user;
          dispatch(loginAction(userData));
          navigate(route);
        }
      } catch (err) {
        console.log('error');
        alert(err.response.data);
      }
    }
  };

  return (
    <div>
      {login ? (
        //if they want to login
        <div>
          <input id='email' placeholder='email'></input>
          <input id='password' placeholder='password'></input>
          <button
            onClick={() => {
              loginHandle('/user/login', 'login');
            }}
          >
            Submit
          </button>
          <a onClick={() => setLogin(false)}>Don't have an account?</a>
        </div>
      ) : (
        //if they want to sign up
        <div>
          <input id='email' placeholder='email'></input>
          <input id='password' placeholder='password'></input>
          <input id='confirm-pass' placeholder='confirm password'></input>
          <button
            onClick={() => {
              loginHandle('/user/signup', 'signup');
            }}
          >
            Submit
          </button>
          <a
            onClick={() => {
              setLogin(true);
            }}
          >
            Already have an account?
          </a>
        </div>
      )}
    </div>
  );
};

export default Login;
