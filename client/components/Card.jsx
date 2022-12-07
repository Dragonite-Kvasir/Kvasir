import React, { useEffect } from 'react';
import '../styles/card.scss';
<<<<<<< HEAD
=======
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '../rootReducer';

>>>>>>> dev
const Card = ({
  name,
  imgUrl,
  willTeach,
  willLearn,
  status,
  button,
  buttonFunction,
  id,
  lastLogin,
  currUser,
  interests
}) => {
<<<<<<< HEAD

  willTeach?.forEach((e) => {
=======
  const dispatch = useDispatch();
  willTeach.forEach((e) => {
>>>>>>> dev
    e = <li className='cardLang'>{e}</li>;
  });
  willLearn?.forEach((e) => {
    e = <li className='cardLang'>{e}</li>;
  });
<<<<<<< HEAD
  interests?.forEach((e) => {
    e = <li className='cardLang'>{e}</li>
  })
=======
  const buttonArray = [];
  if (Array.isArray(button)) {
    button.forEach((button, index) => {
      console.log(button);
      buttonArray.push(
        <a
          className='bot-buttons'
          onClick={(e) => buttonFunction[index](e, id)}
        >
          {button}
        </a>
      );
    });
  } else {
    buttonArray.push(<a onClick={(e) => buttonFunction(e, id)}>{button}</a>);
  }
>>>>>>> dev
  return (
    <div className='card'>
      <p className='cardName'>{name}</p>
      <img className='cardImage' src={imgUrl} alt={`${name}'s profile photo`} />
      <div className='cardLangs'>
        <p className='cardListHeading'>Teaching: </p>
        <ul className='cardLanguageList'>{willTeach}</ul>
      </div>
      <div className='cardLangs'>
        <p className='cardListHeading'>Learning: </p>
        <ul className='cardLanguageList'>{willLearn}</ul>
      </div>
      <div className='cardLangs'>
        <p className='cardListHeading'>Interested in: </p>
        <ul className='cardLanguageList'>{interests}</ul>
      </div>
      <p className='last-login'>{lastLogin}</p>
      <div>
        <div className='bot-buttons'>{buttonArray}</div>
        <div className='bot-buttons'>
          <a
            onClick={() => {
              dispatch(addChat(name));
            }}
          >
            Chat!
          </a>
        </div>
      </div>

    </div>
  );
};

export default Card;
