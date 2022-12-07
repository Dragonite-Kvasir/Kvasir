import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Popup = ({ userdata, trigger, setTrigger }) => {
  //userdata should include display name
  return trigger ? (
    <div id='popup'>
      <div id='popup-inner'>
        <h2>DISPLAY NAME PROFILE</h2>
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
