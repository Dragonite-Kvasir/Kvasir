import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import DropDown from '../components/Dropdown.jsx';
import styles from '../styles/feed.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed } from '../rootReducer.js';
import { current } from '@reduxjs/toolkit';

const Feed = () => {
  const dropDownopt = ['Friends', 'Pending', 'Requests'];
  const currentDrop = useSelector((state) => state.feedCurrent);
  const [dropCurrent, setDropCurrent] = useState(currentDrop);
  const dispatch = useDispatch();
  return (
    <div>
      <Nav />
      <DropDown
        options={dropDownopt}
        current={currentDrop}
        handleChange={(name) => {
          dispatch(updateFeed(name));
          console.log('change');
        }}
      />
      <div id='card-container'></div>
    </div>
  );
};

export default Feed;
