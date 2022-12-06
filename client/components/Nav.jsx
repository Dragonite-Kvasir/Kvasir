import '../styles/nav.scss';
import React from 'react';
import Links from './Links.jsx';
import { useSelector } from 'react-redux';

const Nav = () => {
  console.log('here');
  const loggedInStatus = useSelector((state) => state.loggedIn);
  return (
    <div id='nav-bar'>
      <h1>Kvasir</h1>
      <Links loggedIn={true} />
    </div>
  );
};

export default Nav;
