import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatBox from '../components/chatbox.jsx';
import SendMessage from '../components/SendMessage.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import styles from '../styles/chatbox.scss';

const ChatBar = () => {
  const [openChat, setOpenChat] = useState(false);
  const user = useSelector((state) => state.userInfo.displayName);
  const names = useSelector((state) => state.currentChats);
  const boxArray = [];

  names.forEach((name) => {
    boxArray.push(
      <div>
        <ChatBox
          img={
            'https://media-exp1.licdn.com/dms/image/D4E03AQF3Vc4LC38e6g/profile-displayphoto-shrink_800_800/0/1669821402564?e=1675900800&v=beta&t=C0IU8x638VYRfUxG0_vSbBoO4IU1s1uSxRwH0wtO51w'
          }
          name={name}
          user={user}
        />
      </div>
    );
  });

  return <div id='chat-bar'>{boxArray}</div>;
};

export default ChatBar;
