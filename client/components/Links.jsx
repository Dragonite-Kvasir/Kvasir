import React from 'react';
import { Link } from 'react-router-dom';

const Links = (props) => {
  return (
    <div className='nav-links'>
      {props.loggedIn ? (
        <div>
          <Link to='/explore'>Explore</Link>
          <Link to='/'>Home Page</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/login'>Log Out</Link>
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
