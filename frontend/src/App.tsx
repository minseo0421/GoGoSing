import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import MainHome from './pages/mainhome';
import MusicChart from './pages/musicchart';
import MusicSearch from './pages/musicsearch';
import MusicLike from './pages/musiclike';

import SignUp from './pages/signup';
import Login from './pages/login';
import LocalLogin from './pages/locallogin';

function App() {
  return (
    <Router>
    <div className="App" style={{width:`${window.innerHeight/2}px`}}>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/chart" element={<MusicChart />} />
        <Route path="/search" element={<MusicSearch />} />
        <Route path="/like" element={<MusicLike />} />

        <Route path="/login" element={<Login />} />
        <Route path="/locallogin" element={<LocalLogin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  </Router>

  );
}

export default App;
