import React from 'react';
import db from '../firebase';
import ChatMessage from './ChatMessage';
import SendMessage from './SendMessage';
import { useEffect } from 'react';
import { useState } from 'react';


const ChatBox = (props) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { img, name, friend, user } = props;

  // const collectionName = [friend, user].sort();
  const collectionName = 'messages';

  useEffect(() => {
    console.log('hi');
    db.collection(`${collectionName}`)
      .orderBy('createdAt', desc)
      .limit(8)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);


  return open ? (
    <div className='chatbox'>
      <div className='chatbox-chat'>
        <div className='chatbox-header'>
          <a>{name}</a>
          <a className='chat-btn' onClick={() => setOpen(false)}>
            -
          </a>
          <a
            className='chat-btn'
            onClick={() => console.log('REMOVE FROM CHAT')}
          >
            X
          </a>
        </div>
        <div className='messages'>
          <ChatMessage 
            // user={user}
            // friend={friend}
            messages={messages}
          />
        </div>
          <SendMessage collectionName={collectionName} user={user}/>
        {/* <div className='input-div'>
          <input 
            placeholder='Type here' 
            value={formValue} 
            onChange={(e) => setFormValue(e.target.value)}>

          </input>
        </div> */}
      </div>
    </div>
  ) : (
    <div className='chatbox-mini' onClick={() => setOpen(true)}>
      <img className='chat-img' src={img} />
      <a
        className='chat-btn-mini'
        onClick={() => console.log('REMOVE FROM CHAT')}
      >
        X
      </a>
    </div>
  );
};

export default ChatBox;
