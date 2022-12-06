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
  const loggedInStatus = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  return (
    <div>
      {loggedInStatus ? (
        <div>
          <DropDown
            options={dropDownopt}
            current={dropCurrent}
            handleChange={(name) => {
              dispatch(updateFeed(name));
            }}
          />
          <div id='card-container'></div>
        </div>
      ) : (
        <div>YOU NEED TO LOG IN OK</div>
      )}
    </div>
  );
};

export default Feed;
