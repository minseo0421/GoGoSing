import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import MainHome from "./pages/mainhome";
import MusicChart from "./pages/musicchart";
import MusicSearch from "./pages/musicsearch";
import MusicLike from "./pages/musiclike";

import SignUp from "./pages/account/signup";
import Login from "./pages/account/login";
import LocalLogin from "./pages/account/locallogin";

import BottomBar from "./components/Bottombar";
import Topbar from "./components/Topbar";
import { AnimatePresence, motion } from "framer-motion";
import { PageVariants, PageTransition } from "./components/pageTransition";
import GenreSurvey from "./pages/account/genresurvey";
import SocialSignUp from "./pages/account/socialsignup";
import MyPage from "./pages/account/mypage";

function App() {
  // BottomBar 관련 상태
  const [pageNumber, setPageNumber] = useState(1);
  const [isForwardDirection, setIsForwardDirection] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const pageRoutes = ["/", "/chart", "/search", "/like"];
  const cl = (clickedNumber: number) => {
    setIsForwardDirection(clickedNumber > pageNumber);
    navigate(pageRoutes[clickedNumber]);
    setPageNumber(clickedNumber);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    // 창의 너비가 변경될 때마다 상태를 업데이트합니다.
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App" 
    style={{height:`${windowHeight >= windowWidth *1.7 && windowWidth*2.35 >= windowHeight ? '100vh' : 
            windowHeight < windowWidth *1.7 ? '100vh': `${windowWidth*2.35}px`}`, 
            width:`${windowHeight >= windowWidth *1.7 && windowWidth*2.35 >= windowHeight ? '100vw' : 
            windowHeight < windowWidth *1.7 ? `${windowHeight/1.7}px`:'100vw'}`}}>
      <Topbar />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={PageVariants}
          transition={PageTransition}
          custom={isForwardDirection}
          id='motiondiv'
        >
          <Routes location={location}>
            {/* Bottom Bar */}
            <Route path="/" element={<MainHome />} />
            <Route path="/chart" element={<MusicChart />} />
            <Route path="/search" element={<MusicSearch />} />
            <Route path="/like" element={<MusicLike />} />

            {/* Login status */}
            <Route path="/login" element={<Login />} />
            <Route path="/locallogin" element={<LocalLogin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/socialsignup" element={<SocialSignUp />} />
            <Route path="/genresurvey" element={<GenreSurvey />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <BottomBar onClickButton={cl} />
    </div>
  );
}

export default App;
