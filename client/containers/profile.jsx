import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/profile.scss';
import { updateUserInfo } from '../rootReducer';
import ProfileSection from '../components/ProfileSection.jsx';
import axios from 'axios';
import LoadingSpinner from '../components/Spinner.jsx';

const current = 'Select to Add';


const Profile = ( {userInfo} ) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [edit, setEdit] = useState(false);
  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);
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
  
  const handleSave = async () => {
    setLoading(true);
    try{
      const r1 = await axios.patch(`/user/update/interest`, {
        interests: add.interests,
        email: userInfo.email
      });
      const r2 = await axios.patch(`/user/update/teach`, {
        teach: add.canTeach,
        email: userInfo.email
      });
      const r3 = await axios.patch(`/user/update/learn`, {
        learn: add.canLearn,
        email: userInfo.email
      });
      dispatch(updateUserInfo({
        ...userInfo,
        interests: add.interests,
        canTeach: add.canTeach,
        canLearn: add.canLearn
      }));
    } catch(err) {
      alert('something went wrong');
    }
    setEdit(false);
    setLoading(false);
  }

  const handleCancel = () => {
    setEdit(false);
  }

  const handleDisplayName = async () => {
    try {
      const r = await axios.patch(`/user/update/name`, {
        email: userInfo.email,
        displayName: newDisplayName
      });
      dispatch(updateUserInfo({
        ...userInfo, 
        displayName: newDisplayName
      }))
      setEdit(false);
    } catch (err) {
      alert('Something went wrong');
    }
  }

  const handlePassword = async () => {
    if(newPassword !== confirmPassword){
      alert('password and confirmPassword must match');
    }else if(password === newPassword){
      alert('That is your password already');
    }else {
      try {
        const r = await axios.post(`/user/check`, {
          email: userInfo.email,
          password: password
        });
        console.log(r.status);
        if(r.status === 200){
          console.log('in here');
          try {
            const r2 = await axios.patch(`/user/update/password`, {
              email: userInfo.email,
              password: newPassword
            });
            console.log(r2);
            dispatch(updateUserInfo({
              ...userInfo, 
              displayName: newDisplayName
            }));
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
          } catch(err) {
            alert('something went wrong');
          }
        } else {
          alert('Your password was incorrect.');
        }
        setEdit(false);
      } catch (err) {
        alert('Something went wrong');
        setEdit(false);
      }
    }
  }

  useEffect(() => {
    const fetchData = async() => {
      try{
        const interesting = await axios.get(`/interests`);
        setInterests(interesting.data);
        const linguistic = await axios.get(`/languages`);
        setLanguages(linguistic.data);
      } catch(err) { 
        setInterests(['Something went wrong']);
        setLanguages(['Something went wrong']);
      }

    }
    fetchData();
  }, [])
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
      {loading ? <LoadingSpinner /> : <></>}
      <div >
          <p className="profile-title">Display Name: {userInfo.displayName}</p>
        </div>
      <ProfileSection 
        edit={edit} 
        id="section_canLearn" 
        handleAdd={handleAdd} 
        options={languages} 
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
        options={languages} 
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
        options={interests} 
        current={current} 
        info={edit?add.interests:userInfo.interests} 
        type='interests' name="I am interested in: " 
        handleRemove={handleRemove}
      />
      {!edit ? <button className='profile-btn' onClick={()=>setEdit(!edit)} id="edit-button">Edit</button> : <></>}

      {edit ? <button className='profile-btn' onClick={handleSave}>Save</button> : <></>}

      {edit ? <button className='profile-btn' onClick={handleCancel}>Cancel</button> : <></>}
      <section className="profile-section">
        
        <div id='change-display-name'>
          <label className="profile-title" htmlFor="displayName">Change Display Name:</label>
          <input 
            name="displayName"
            className='input-box'
            placeholder='Enter new display name' 
            type="text" 
            value={newDisplayName} 
            onChange={e => setNewDisplayName(e.target.value)}
          />
          <button id="edit-button" className='profile-btn' type="submit" onClick={handleDisplayName}>Submit</button>
        </div>
        <div id='pass-change-box'>
          <label className="profile-title">Change Your Password:</label>
          <section className='password-inputs'>
            <label className="pass-title" htmlFor="password">Current Password:</label>
            <input 
              name="password" 
              className='input-box' 
              type="text" 
              placeholder='Enter current password' 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </section>
          <section className='password-inputs'>
            <label className="pass-title" htmlFor="newPassword">New Password:</label>
            <input 
              name="newPassword" 
              className='input-box' 
              placeholder='Enter new password' 
              type="text" onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </section>
          <section className='password-inputs'>
            <label className="pass-title" htmlFor="confirm">Confirm New Password:</label>
            <input 
              name="confirm" 
              className='input-box' 
              type="text" 
              placeholder='Re-enter new password' 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              value={confirmPassword}
            />
          </section>
          <button id="edit-button" className='profile-btn'>Submit</button>
        </div>
      </section>
    </div>
  )
};

export default Profile;
