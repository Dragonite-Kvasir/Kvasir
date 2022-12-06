import React from 'react';
import Nav from './Nav.jsx';
import { Routes, Route } from 'react-router-dom';
import Feed from '../containers/feed.jsx';
import Profile from '../containers/profile.jsx';
import Login from '../containers/login.jsx';
import Explore from '../containers/explore.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
