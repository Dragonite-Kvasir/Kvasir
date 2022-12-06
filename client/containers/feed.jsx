import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import DropDown from '../components/Dropdown.jsx';
import styles from '../styles/feed.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed } from '../rootReducer.js';
import axios from 'axios';
import ChatBar from './chatbar.jsx';

const Feed = () => {
  const dropDownopt = ['Friends', 'Pending', 'Requests'];
  const currentDrop = useSelector((state) => state.feedCurrent);
  //query for friends, returns array of all friends,
  const friendsArray = [];
  //   const getFriends = async (name) => {
  //     const index = dropDownopt.indexOf(name) + 1;
  //     try {
  //       const response = axios.get('/friends', { params: { type: index } });
  //       response.forEach((friend) => {
  //         //logic to create friend card, push into array
  //       })
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  useEffect(() => {}, [friendsArray]);

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
              getFriends(name);
            }}
          />
          <div id='card-container'>{friendsArray}</div>
          <ChatBar />
        </div>
      ) : (
        <div>YOU NEED TO LOG IN OK</div>
      )}
    </div>
  );
};

export default Feed;
