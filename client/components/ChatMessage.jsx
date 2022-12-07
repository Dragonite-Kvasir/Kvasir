import React, { useState, useEffect } from 'react';



const ChatMessage = (props) => {
  return (
    <div className='chat-message'>
      {props.messages.map(({ id, text, createdAt }) => {
        return (
          <div key={createdAt}>
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessage;