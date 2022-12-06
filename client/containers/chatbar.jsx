import React, { useState, useEffect } from 'react';
import ChatBox from '../components/chatbox.jsx';
import styles from '../styles/chatbox.scss';

const ChatBar = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div id='chat-bar'>
      <ChatBox
        img={
          'https://media-exp1.licdn.com/dms/image/D4E03AQF3Vc4LC38e6g/profile-displayphoto-shrink_800_800/0/1669821402564?e=1675900800&v=beta&t=C0IU8x638VYRfUxG0_vSbBoO4IU1s1uSxRwH0wtO51w'
        }
        name={'Cassidy'}
      />
      <ChatBox
        img={
          'https://media-exp1.licdn.com/dms/image/D4E03AQH2Qn7l9oEW7Q/profile-displayphoto-shrink_800_800/0/1669423518618?e=1675900800&v=beta&t=_jn6ZDTiFlh7SbSzuk19EFBjm7nT1uguz3tE7rNiIXU'
        }
        name={'Kelly'}
      />
    </div>
  );
};

export default ChatBar;
