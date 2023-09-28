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

import MusicRecord from "./pages/musicrecord/musicrecord";
import MusicUpload from "./pages/musicupload/musicupload";
import RecordResult from "./pages/musicrecord/recordresult";
import UploadResult from "./pages/musicupload/uploadresult";

import BottomBar from "./components/Bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { PageVariants, PageTransition } from "./components/pageTransition";
import GenreSurvey from "./pages/account/genresurvey";
import SocialSignUp from "./pages/account/socialsignup";
import MyPage from "./pages/account/mypage";
import FindPassWord from "./pages/account/findpw";
import SocialLogin from "./pages/account/sociallogin";
import MusicDetail from "./pages/musicDetail";
import { useSelector } from "react-redux";
import { AppState } from "./store/state";
import GenreSelect from "./pages/genreselect";

function App() {
  // BottomBar 관련 상태
  const [pageNumber, setPageNumber] = useState(1);
  const [isForwardDirection, setIsForwardDirection] = useState(true);
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);

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
      <div id='musicdetailmodal'>
        <MusicDetail />
      </div>
      <div id='genremodal'>
        <GenreSelect />
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
            <Route path="/genresurvey" element={<GenreSurvey />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/findpw" element={<FindPassWord />} />

            {/* Music Record */}
            <Route path="/record" element={<MusicRecord />} />
            <Route path="/recordresult" element={<RecordResult />} />
            <Route path="/musicupload" element={<MusicUpload />} />
            <Route path="/uploadresult" element={<UploadResult />} />
            
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
