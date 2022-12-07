import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import DropDown from '../components/Dropdown.jsx';
import styles from '../styles/feed.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed, addFriends } from '../rootReducer.js';
import axios from 'axios';
import ChatBar from './chatbar.jsx';
import Card from '../components/Card.jsx';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropDownopt = ['Friends', 'Pending', 'Requests'];
  const currentDrop = useSelector((state) => state.feedCurrent);
  const currUser = useSelector((state) => state.userInfo.id);
  const currFriends = useSelector((state) => state.currFriends);
  const [dropCurrent, setDropCurrent] = useState(currentDrop);
  const loggedInStatus = useSelector((state) => state.loggedIn);
  const [cards, setCards] = useState([]);

  //query for friends, returns array of all friends,
  const storeUserCards = { 1: [], 2: [], 3: [] };
  const [storedCards, SetStoredCards] = useState(storeUserCards);

  const deleteFunction = (friendId) => {
    console.log('delete ' + userId);
  };
  const respondFunction = async (friendId) => {
    console.log('hi');
  };

  // const addFriend = async (e, friendID) => {
  //   const parent = e.target.closest('div.card');
  //   try {
  //     const response = await axios.post(`/partner/add/${friendID}`, {
  //       currUser: currUserId,
  //     });
  //     const temp = response.data;
  //     const friend = Object.assign({}, response.data, { status: 2 });
  //     dispatch(updateFriend(friend));
  //     parent.remove();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getFriends = async (name) => {
    try {
      if (currUser !== 0) {
        const response = await axios.get('/partner/getFriends', {
          params: { userId: currUser },
        });
        const users = response.data;
        let buttons = ['Delete'];
        let buttonsFunction = [deleteFunction];
        for (let status in users) {
          console.log(typeof status, 'statuhusfhiuaf');
          if (status == 2) {
            buttons.push('Add Friend');
            buttonsFunction.push(respondFunction);
          } else {
            buttons = ['Delete'];
            buttonsFunction = [deleteFunction];
          }
          users[status].forEach((user) => {
            storeUserCards[status].push(
              <Card
                key={user._id}
                id={user._id}
                status={status}
                button={buttons}
                buttonFunction={buttonsFunction}
                name={user.display_name ? user.display_name : 'None'}
                email={user.email}
                lastLogin={user.last_login}
                imgUrl='https://static.vecteezy.com/system/resources/previews/003/597/339/original/cute-coffee-mug-cartoon-illustration-free-vector.jpg'
                willTeach={['German']}
                willLearn={['Cantonese', 'English']}
              />
            );
          });
        }
        dispatch(addFriends(users));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkArray = () => {
    try {
      if (currentDrop === 'Friends') {
        setCards(storedCards[1]);
      } else if (currentDrop === 'Pending') {
        setCards(storedCards[3]);
      } else if (currentDrop === 'Requests') {
        setCards(storedCards[2]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    checkArray();
  }, [dropCurrent]);

  useEffect(() => {
    console.log(loggedInStatus, 'status');
    if (!loggedInStatus) {
      navigate('/login');
    } else {
      getFriends();
    }
  }, []);

  return (
    <div>
      <div>
        <DropDown
          options={dropDownopt}
          current={dropCurrent}
          handleChange={(name) => {
            dispatch(updateFeed(name));
            setDropCurrent(name);
            checkArray;
          }}
        />
        <div id='card-container'>{cards}</div>
        <ChatBar />
      </div>
    </div>
  );
};

export default Feed;
