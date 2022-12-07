import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './Nav.jsx';
import { Routes, Route } from 'react-router-dom';
import Feed from '../containers/feed.jsx';
import Profile from '../containers/profile.jsx';
import Login from '../containers/login.jsx';
import Explore from '../containers/explore.jsx';
import '../styles/global.scss';

const App = () => {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div id='full-page-layout'>
      <Nav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<Profile userInfo={userInfo} />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
