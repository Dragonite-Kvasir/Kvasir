import React from 'react';
import { Link } from 'react-router-dom';
import { loginAction } from '../rootReducer';
import { useDispatch } from 'react-redux';
import '../styles/nav.scss';

const Links = ({ loggedIn } = props) => {
  const dispatch = useDispatch();
  return (
    <div id='links-container'>
      {loggedIn ? (
        <div id='all-links'>
          <Link to='/explore' className='nav-links'>
            Explore
          </Link>
          <Link to='/' className='nav-links'>
            Feed
          </Link>
          <Link to='/profile' className='nav-links'>
            Profile
          </Link>
          <Link to='/login' className='nav-links'>
            Log Out
          </Link>
        </div>
      ) : (
        <div id='login-container'>
          <Link
            to='/login'
            className='nav-links'
            onClick={() => {
              dispatch(loginAction(false));
            }}
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Links;
