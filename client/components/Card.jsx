import React, { useEffect } from 'react';
import '../styles/card.scss';
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

  willTeach?.forEach((e) => {
    e = <li className='cardLang'>{e}</li>;
  });
  willLearn?.forEach((e) => {
    e = <li className='cardLang'>{e}</li>;
  });
  interests?.forEach((e) => {
    e = <li className='cardLang'>{e}</li>
  })
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
        <a onClick={(e) => buttonFunction(e, id)}>{button}</a>
        <a
          onClick={() => {
            console.log('chat');
          }}
        >
          Chat!
        </a>
      </div>

    </div>
  );
};

export default Card;
