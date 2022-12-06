import React from 'react';
import { Link } from 'react-router-dom';
import { loginAction } from '../rootReducer';
import { useDispatch } from 'react-redux';

const Links = ({ loggedIn } = props) => {
  const dispatch = useDispatch();
  return (
    <div className='nav-links'>
      {loggedIn ? (
        <div>
          <Link to='/explore'>Explore</Link>
          <Link to='/'>Home Page</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/login' onClick={() => dispatch(loginAction())}>
            Log Out
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/login'>Login</Link>
        </div>
      )}
    </div>
  );
};

export default Links;
