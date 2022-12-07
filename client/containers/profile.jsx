import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/profile.scss';
import { updateUserInfo } from '../rootReducer';
import ProfileSection from '../components/ProfileSection.jsx';
const options = ['bye', 'happy', 'sad'];
const current = 'hi';


const Profile = ( {userInfo} ) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState({
    canTeach: [],
    canLearn: [],
    interests: []
  });
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    const type = Array.from(e.target.classList)[0];
    const newAdd = {
      ...add
    }
    const i = newAdd[type].indexOf(e.target.id);
    newAdd[type] = newAdd[type].slice(0,i).concat(newAdd[type].slice(i+1, newAdd[type].length));
    setAdd({
      ...newAdd
    })
  }


  const handleAdd = (e, name, type) => {
    console.log(type);
    if(!add[type].includes(name)){
      const newAdd = {
        ...add
      }
      newAdd[type].push(name);
      setAdd({
        ...newAdd
      })
    }
  }
  
  const handleSave = () => {
    dispatch(updateUserInfo({
      ...userInfo,
      interests: add.interests,
      canTeach: add.canTeach,
      canLearn: add.canLearn
    }));
    setEdit(false);
  }

  const handleCancel = () => {
    setEdit(false);
    Array.from(document.querySelector('div.deleteMe')).forEach(e => e.remove());
  }

  useEffect(() => {
    setAdd({
      interests: [],
      canTeach: [],
      canLearn: []
    })
  }, [userInfo])

  useEffect(() => {
    if(edit){
      setAdd({
        interests: [
          ...userInfo.interests
        ],
        canTeach: [
          ...userInfo.canTeach
        ],
        canLearn: [
          ...userInfo.canLearn
        ]
      })
    }
    // load remaining languages into the dropdowns
    // if user selects a language they already have, ignore them
  }, [edit]);


  return ( 
    <div id="profile-page">

      <ProfileSection 
        edit={edit} 
        id="section_canLearn" 
        handleAdd={handleAdd} 
        options={options} 
        current={current} 
        name="I want to learn: " 
        info={edit?add.canLearn:userInfo.canLearn} 
        type='canLearn' 
        handleRemove={handleRemove}
      />

      <ProfileSection 
        edit={edit} 
        id="section_canTeach" 
        handleAdd={handleAdd} 
        options={options} 
        current={current} 
        name="I can teach: " 
        info={edit?add.canTeach:userInfo.canTeach} 
        type='canTeach' 
        handleRemove={handleRemove}
      />

      <ProfileSection 
        edit={edit} 
        id="section_interests" 
        handleAdd={handleAdd} 
        options={options} 
        current={current} 
        info={edit?add.interests:userInfo.interests} 
        type='interests' name="I am interested in: " 
        handleRemove={handleRemove}
      />

      <section className="profile-section">
        <p className="profile-title">Basic Info:</p>
        <div className="profile-selections">
          <p>Display Name: {userInfo.displayName}</p>
        </div>
        <div className="edit hidden">
          <label htmlFor="displayName">Change Display Name:</label>
          <input name="displayName" type="text" value={newDisplayName} onChange={e => setNewDisplayName(e.target.value)}/>
          <button type="submit" onClick={e => console.log(newDisplayName)}>Submit</button>
        </div>
        <div id='pass-change-box'>
          <label>Change Your Password:</label>
          <section className='password-inputs'>
            <label htmlFor="password">Current Password:</label>
            <input name="password" type="text" onChange={(e) => setPassword(e.target.value)}value={password}/>
          </section>
          <section className='password-inputs'>
            <label htmlFor="newPassword">New Password:</label>
            <input name="newPassword" type="text" onChange={(e) => setNewPassword(e.target.value)}value={newPassword}/>
          </section>
          <section className='password-inputs'>
            <label htmlFor="confirm">Confirm New Password:</label>
            <input name="confirm" type="text" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
          </section>
          <button>Submit</button>
        </div>
      </section>
      {!edit ? <button onClick={()=>setEdit(!edit)} className="edit-button">Edit</button> : <></>}

      {edit ? <button onClick={handleSave}>Save</button> : <></>}

      {edit ? <button onClick={handleCancel}>Cancel</button> : <></>}
    </div>
  )
};

export default Profile;
