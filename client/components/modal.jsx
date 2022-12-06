import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Popup = ({ trigger, setTrigger }) => {
  return trigger ? (
    <div id='popup'>
      <div id='popup-inner'>
        <h2>PROFILE</h2>
        <button className='close-btn' onClick={() => setTrigger(false)}>
          X
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Popup;
