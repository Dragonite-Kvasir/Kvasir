import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropDown from '../components/Dropdown.jsx';
import Card from '../components/Card.jsx';
import '../styles/explore.scss';
import { updateExplore, updateFriend } from '../rootReducer.js';
import ChatBar from './chatbar.jsx';
import axios from 'axios';

const Explore = () => {
  const dispatch = useDispatch();
  const learnOptions = useSelector((state) => state.userInfo.canLearn);
  const teachOptions = useSelector((state) => state.userInfo.canTeach);
  const currUserId = useSelector((state) => state.userInfo.id);
  const checkfriends = useSelector((state) => state.currUser);
  const learn = useSelector((state) => {
    if (!state.exploreCurrent.willLearn) return 'Select';
    else return state.exploreCurrent.willLearn;
  });
  const teach = useSelector((state) => {
    if (!state.exploreCurrent.willTeach) return 'Select';
    else return state.exploreCurrent.willTeach;
  });
  const [cards, setCards] = useState([]);

  const addFriend = async (e, friendID) => {
    const parent = e.target.closest('div.card');
    try {
      const response = await axios.post(`/partner/add/${friendID}`, {
        currUser: currUserId,
      });
      const temp = response.data;
      const friend = Object.assign({}, response.data, { status: 2 });
      dispatch(updateFriend(friend));
      parent.remove();
    } catch (err) {
      console.log(err);
    }
  };

  const getFriends = async () => {
    try {
      const response = await axios.get('/partner/explore/', {
        params: { id: currUserId },
      });
      const tempCards = [];
      response.data.map((card) => {
        tempCards.push(
          <Card
            key={card._id}
            id={card._id}
            imgUrl={
              'https://static.vecteezy.com/system/resources/previews/003/597/339/original/cute-coffee-mug-cartoon-illustration-free-vector.jpg'
            }
            name={card.display_name ? card.display_name : 'None'}
            willTeach={['Japanese']}
            willLearn={['Russian']}
            button='Add Friend'
            buttonFunction={addFriend}
            lastLogin={card.last_login}
          />
        );
      });
      setCards(tempCards);
    } catch (err) {}
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div id='explore-page'>
      <aside id='explore-aside'>
        <div className='filter'>
          <label className='filter-heading'>I want to learn: </label>
          <DropDown
            options={learnOptions}
            current={learn}
            handleChange={(e) => {
              dispatch(updateExplore({ willTeach: teach, willLearn: e }));
              console.log('changed learn to ' + e);
            }}
          />
        </div>
        <div className='filter'>
          <label className='filter-heading'>I want to teach: </label>
          <DropDown
            options={teachOptions}
            current={teach}
            handleChange={(e) => {
              dispatch(updateExplore({ willTeach: e, willLearn: learn }));
              console.log('changed teach to ' + e);
            }}
          />
        </div>
      </aside>
      <div className='card-holder'>{cards}</div>
      <ChatBar />
    </div>
  );
};

export default Explore;
