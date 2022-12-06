import React, { useState } from 'react';

const ChatBox = ({ img, name }) => {
  const [open, setOpen] = useState(false);
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
          <p>hi</p>
        </div>
        <div className='input-div'>
          <input placeholder='Type here'></input>
        </div>
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
