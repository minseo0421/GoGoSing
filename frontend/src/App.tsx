import React from "react";
import { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import MainHome from "./pages/mainhome";
import MusicChart from "./pages/musicchart";
import MusicSearch from "./pages/musicsearch";
import MusicLike from "./pages/musiclike";

import SignUp from "./pages/account/signup";
import Login from "./pages/account/login";
import LocalLogin from "./pages/account/locallogin";

import MusicRecord from "./pages/musicrecord/musicrecord";
import MusicUpload from "./pages/musicupload/musicupload";
import RecordResult from "./pages/musicrecord/recordresult";
import UploadResult from "./pages/musicupload/uploadresult";

import BottomBar from "./components/Bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { PageVariants, PageTransition } from "./components/pageTransition";

import SocialSignUp from "./pages/account/socialsignup";
import MyPage from "./pages/account/mypage";
import FindPassWord from "./pages/account/findpw";
import SocialLogin from "./pages/account/sociallogin";
import MusicDetail from "./pages/musicDetail";
import GenreSelect from "./pages/genreselect";
import MusicSing from "./pages/musicsing";
import GenreMusic from "./pages/genremusic";



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
  
  return (
    <div className="App" style={{height:'100vh',width:'100vw', overflow:'hidden'}}>
      <div id='modals'>
        <MusicDetail />
        <GenreSelect />
        <MusicSing />
      </div>

      <AnimatePresence initial={false} mode="wait"> 
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={PageVariants}
          transition={PageTransition}
          custom={isForwardDirection}
          id="motiondiv"
          style={{ height: "88%", width:'100%' }}
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
            <Route path="/sociallogin" element={<SocialLogin />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/findpw" element={<FindPassWord />} />

            {/* Music Record */}
            <Route path="/record" element={<MusicRecord />} />
            <Route path="/recordresult" element={<RecordResult />} />
            <Route path="/musicupload" element={<MusicUpload />} />
            <Route path="/uploadresult" element={<UploadResult />} />
            
            {/* 장르 별 인기차트 조회 */}
            <Route path="/genremusic" element={<GenreMusic />} />
            
          </Routes>
        </motion.div>
        <div style={{height:'12%', width:'100%'}}>
          <BottomBar onClickButton={cl}/>
        </div>
      </AnimatePresence>
    </div>
  );
}

export default App;
