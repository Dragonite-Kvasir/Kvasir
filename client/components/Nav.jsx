import '../styles/nav.scss';
import React from 'react';
import Links from './Links.jsx';
import { useSelector } from 'react-redux';

const logo = require('../assets/kvasir-coffee.png');

const Nav = () => {
  console.log('here');
  const loggedInStatus = useSelector((state) => state.loggedIn);
  console.log(loggedInStatus, 'nav');
  return (
    <div id='navbar'>
      <section id='left-nav'>
        <img src={logo} id='logo-pic' alt='Kvasir logo' />
        <h1 id='nav-title'>Kvasir</h1>
      </section>
      <section id='right-nav'>
        <Links loggedIn={loggedInStatus} />
      </section>
    </div>
  );
};

export default Nav;
