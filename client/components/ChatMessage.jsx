import React, { useState, useEffect } from 'react';



const ChatMessage = (props) => {
  return (
    <div className='chat-message'>
      {props.messages.map(({  id, text, createdAt }) => {
        if(id === props.user) {
          return (
            <div key={createdAt}>
              <p className = 'single-message-user'>{text}</p>
            </div>
          );
        }else {
          return (
            <div key={createdAt}>
              <p className = 'single-message-friend'>{text}</p>
            </div>
          );
        }
      
      })}
    </div>
  );
};

export default ChatMessage;