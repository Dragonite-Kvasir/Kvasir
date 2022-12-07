import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import DropDown from '../components/Dropdown.jsx';
import styles from '../styles/feed.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed } from '../rootReducer.js';
import axios from 'axios';
import ChatBar from './chatbar.jsx';
import Card from '../components/Card.jsx';

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
  const [cards, setCards] = useState([]);

  // CHANGE -- query the database to grab matching users/profiles
  const cardsArray = [
    <Card
      name='Kate'
      status={'Friend'}
      imgUrl='https://media-exp1.licdn.com/dms/image/D5603AQHSp4HQWIqk3Q/profile-displayphoto-shrink_800_800/0/1669852886544?e=1675900800&v=beta&t=gXRgilH66Ve0RurZ3SqpIrneAV-3PkONwtK85WWfzko'
      willTeach={['Russian']}
      willLearn={['Cantonese', 'Norwegian']}
    />,
    <Card
      status={'Requested'}
      name='Kelly'
      imgUrl='https://media-exp1.licdn.com/dms/image/D4E03AQH2Qn7l9oEW7Q/profile-displayphoto-shrink_800_800/0/1669423518618?e=1675900800&v=beta&t=_jn6ZDTiFlh7SbSzuk19EFBjm7nT1uguz3tE7rNiIXU'
      willTeach={['Japanese']}
      willLearn={['Korean', 'German']}
    />,
    <Card
      status={'Pending'}
      name='Emily'
      imgUrl='https://media-exp1.licdn.com/dms/image/C4E03AQGoCiZlHk4INg/profile-displayphoto-shrink_800_800/0/1586788791685?e=1675900800&v=beta&t=pfrHp3Ilczx7Qn4EgNAX4qiTB58PmgpSqTDQjmuq2x4'
      willTeach={['German']}
      willLearn={['Cantonese', 'English']}
    />,
    <Card
      status={'Friend'}
      name='Cassidy'
      imgUrl='https://media-exp1.licdn.com/dms/image/D4E03AQF3Vc4LC38e6g/profile-displayphoto-shrink_800_800/0/1669821402564?e=1675900800&v=beta&t=C0IU8x638VYRfUxG0_vSbBoO4IU1s1uSxRwH0wtO51w'
      willTeach={['Arabic']}
      willLearn={['English', 'Spanish']}
    />,
  ];
  useEffect(() => {
    if (dropCurrent === 'Friend') {
      setCards();
    } else if (dropCurrent === 'Pending') {
      setCards(pendArray);
    } else if (dropCurrent === 'Requested') {
      setCards(reqArray);
    }
  }, [dropCurrent]);
  const reqArray = [];
  const friendArray = [];
  const pendArray = [];

  cardsArray.forEach((card) => {
    if (card.props.status === 'Friend') {
      friendArray.push(card);
    } else if (card.props.status === 'Requested') {
      reqArray.push(card);
    } else if (card.props.status === 'Pending') {
      pendArray.push(card);
    }
  });

  const handleCards = (name) => {};
  return (
    <div>
      {loggedInStatus ? (
        <div>
          <DropDown
            options={dropDownopt}
            current={dropCurrent}
            handleChange={(name) => {
              dispatch(updateFeed(name));
              // getFriends(name);
              setDropCurrent(name);
              if (name === 'Friends') {
                setCards(friendArray);
              } else if (name === 'Pending') {
                setCards(pendArray);
              } else if (name === 'Requests') {
                setCards(reqArray);
              }
            }}
          />
          <div id='card-container'>{cards}</div>
          <ChatBar />
        </div>
      ) : (
        <div>YOU NEED TO LOG IN OK</div>
      )}
    </div>
  );
};

export default Feed;
