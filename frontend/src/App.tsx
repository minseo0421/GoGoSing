import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import MainHome from './pages/mainhome';
import MusicChart from './pages/musicchart';
import MusicSearch from './pages/musicsearch';
import MusicLike from './pages/musiclike';
import NavBar from './components/navbar';

function App() {
  useEffect(()=>{
    console.log(window.innerWidth)
  })

  return (
    <Router>
    <div className="App" style={{width:`${window.innerHeight/2}px`}}>
      <div >
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/chart" element={<MusicChart />} />
          <Route path="/search" element={<MusicSearch />} />
          <Route path="/like" element={<MusicLike />} />
        </Routes>
      </div>
      <NavBar />
    </div>
  </Router>

  );
}

export default App;
