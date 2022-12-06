import '../styles/nav.scss';
import React from 'react';
import Links from './Links.jsx';

const Nav = (props) => {
  console.log('here');
  return (
    <div id='nav-bar'>
      <h1>Kvasir</h1>
      <Links loggedIn={props.loggedIn} />
    </div>
  );
};

export default Nav;
