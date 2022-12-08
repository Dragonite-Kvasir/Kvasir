import React from 'react';
import db from '../firebase';
import ChatMessage from './ChatMessage.jsx';
import SendMessage from './SendMessage.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeChat } from '../rootReducer';

const ChatBox = (props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  //name represents the friend you are chatting with (from chatBar)
  const { img, name, user } = props;
  //the sort method here ensures that messages between a name/user pair always ends up in the same collection
  const collectionName = [name, user].sort();
  // const collectionName = 'messages';

  useEffect(() => {
    console.log('hi');
    db.collection(`${collectionName}`)
      .orderBy('createdAt')
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
          <a className='chat-btn' onClick={() => dispatch(removeChat(name))}>
            X
          </a>
        </div>
        <div className='messages'>
          <ChatMessage 
            user={user}
            name={name}
            messages={messages}
          />
          <SendMessage collectionName={collectionName} user={user} name={name}/>
        </div>
          
      </div>
    </div>
  ) : (
    <div className='chatbox-mini' onClick={() => setOpen(true)}>
      <img className='chat-img' src={img} />
      <a className='chat-btn-mini' onClick={() => dispatch(removeChat(name))}>
        X
      </a>
    </div>
  );
};

export default ChatBox;
