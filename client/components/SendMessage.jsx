import React, { useState } from 'react';
import db from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const SendMessage = (props) => {
  const [message, setMessage] = useState('');
  const [blank, setBlank] = useState('');

  const send = async (e) => {
    e.preventDefault();
    setBlank('');
    const { user, name, collectionName } = props;
    
    console.log(collectionName);
    await db.collection(`${collectionName}`).add({
      text: `${user}: ${message}`,
      id: user,
      friend: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage('');
  };

  return (
    <div>
      <form className='input-dev' onSubmit={send}>
        <input
          className='msg-input'
          value={blank}
          onChange={(e) => {
            let newText = e.target.value.replace(
              /\bshit|fuck|bitch|create +react +app|hate +javascript|hate+ codesmith\b/gi, ' 🧐🧐🧐🧐'
            );
            setMessage(newText);
            setBlank(e.target.value);
          }}
          placeholder="Type here"
          ></input>
          <button className='msg-btn' type='submit'>
            Send
          </button>
      </form>
    </div>
  );
}

export default SendMessage;