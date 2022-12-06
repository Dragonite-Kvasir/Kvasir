import { useSelector } from 'react-redux';
import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/profile.scss';
import DropDown from '../components/Dropdown.jsx';

const options = ['bye', 'happy', 'sad'];
const current = 'hi';

const Profile = () => {
  const learnOptions = useSelector((state) => state.userInfo.canLearn);
  const teachOptions = useSelector((state) => state.userInfo.canTeach);
  const interestOptions = useSelector((state) => state.userInfo.interests);
  const displayName = useSelector((state) => state.userInfo.displayName);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [edit, setEdit] = useState(false);

  console.log(learnOptions, teachOptions);

  const handleRemove = (e) => {
    // delete fetch to remove user interests
    // then delete the element with the corresponding id from the page
    const type = Array.from(e.target.classList)[0];
    const node = document.getElementById(`${type}_${e.target.id}`);
    node.remove();
  }

  const handleAdd = (e) => {
    console.log(e);
    // patch fetch to add user_interest
    // then add the new interest to the page
  
  }

  const generateButton = (type, name, i) => {
    console.log(type, name, i);
    return ( 
      <div id={`${type}_${name}`} className="pb" key={`${type[0]}_${i}`}>
        <button className="profile-button">{name}</button>
        <a id={`${name}`} className={`${type} remove-link edit hidden`} onClick={handleRemove}>x</a>
      </div>
    )
  }

  const learning = learnOptions.map((e, i) => {
    return generateButton('learn', e, i);
  });

  const teaching = teachOptions.map((e, i) => {
    return generateButton('teach', e, i);
  });
  
  const interests = interestOptions.map((e, i) => {
    return generateButton('interests', e, i);
  })



  useEffect(() => {
    const links = Array.from(document.querySelectorAll('.edit'));
    if(edit){
      links.forEach((e) => e.classList.remove('hidden'));
    } else {
      links.forEach((e) => e.classList.add('hidden'));
    }
    // load remaining languages into the dropdowns
    // if user selects a language they already have, ignore them
  }, [edit]);


  return ( 
    <div id="profile-page">
      <button onClick={(e) => setEdit(!edit)} className="edit-button">Edit</button>
      <section className="profile-section">
        <p className="profile-title">I am teaching:</p>
        <div className="profile-selections">
          {teaching}
        </div>
        <div className="edit hidden">
          <DropDown handleChange={handleAdd} options={options} current={current}/>
        </div>
      </section>
      <section className="profile-section">
        <p className="profile-title">I am learning:</p>
        <div className="profile-selections">
          {learning}
        </div>
        <div className="edit hidden">
          <DropDown handleChange={handleAdd} options={options} current={current}/>
        </div>
      </section>
      <section className="profile-section">
        <p className="profile-title">My interests are:</p>
        <div className="profile-selections">
          {interests}
        </div>
        <div className="edit hidden">
          <DropDown handleChange={handleAdd} options={options} current={current}/>
        </div>
      </section>
      <section className="profile-section">
        <p className="profile-title">Basic Info:</p>
        <div className="profile-selections">
          <p>Display Name: {displayName}</p>
        </div>
        
        <div className="edit hidden">
          <label htmlFor="displayName">Change Display Name:</label>
          <input name="displayName" type="text" value={newDisplayName} onChange={e => setNewDisplayName(e.target.value)}/>
          <button type="submit" onClick={e => console.log(newDisplayName)}>Submit</button>
        </div>
        <div className="edit hidden">
          <label>Change Your Password:</label>
          <label htmlFor="password">Current Password:</label>
          <input name="password" type="text" />
          <label htmlFor="newPassword">New Password:</label>
          <input name="newPassword" type="text" />
          <label htmlFor="confirm">Confirm New Password:</label>
          <input name="confirm" type="text" />
          <button className="edit hidden">Submit</button>
        </div>
      </section>
    </div>
  )
};

export default Profile;
