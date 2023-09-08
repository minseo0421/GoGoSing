import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from './bar.module.css';

const Topbar: React.FC = () => {
  const usertoken = localStorage.getItem('usertoken')
  const location = useLocation();
  // isMain 프로퍼티도 구조 분해 할당으로 가져옴
  return (
    <>
      {location.pathname === "/" ||
      location.pathname === "/chart" ||
      location.pathname === "/search" ||
      location.pathname === "/like" ? 
      <div  className={styled.topbar}>
        <img src="assets/logo.png" alt="" style={{ width: "20%" }} />
        {usertoken ? 
        <Link style={{ color: "white" }} to="/mypage"><img src="assets/default_user.png" alt="" style={{ width: "80%"}} /></Link>
        : <Link style={{ color: "white" }} to="/login">Login</Link>}
      </div>
      :null
      }
    </>
  );
};

export default Topbar;