import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "./bar.module.css";

import { AppState } from "../store/state";
import { setPage } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";

interface BottomBarProps {
  onClickButton: (index: number) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onClickButton }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isPage = useSelector((state: AppState) => state.isPage);
  const navigate = useNavigate();
  return (
    <>
      {location.pathname === "/" ||
      location.pathname === "/chart" ||
      location.pathname === "/search" ||
      location.pathname === "/like" ? (
        <div className={styled.Navbar}>
          <div className={styled.iconbar}>
            <div
              className={`${styled.iconbtn} ${
                isPage === 1 ? styled.sel_icon : null
              }`}
              onClick={() => {
                onClickButton(0);
                dispatch(setPage(1));
              }}
            >
              <img
                src={`${
                  isPage === 1 ? "assets/sel_home.png" : "assets/unsel_home.png"
                }`}
                alt=""
              />
              홈
            </div>
            <div
              className={`${styled.iconbtn} ${
                isPage === 2 ? styled.sel_icon : null
              }`}
              onClick={() => {
                onClickButton(1);
                dispatch(setPage(2));
              }}
            >
              <img
                src={`${
                  isPage === 2
                    ? "assets/sel_chart.png"
                    : "assets/unsel_chart.png"
                }`}
                alt=""
              />
              차트
            </div>
            <div
              className={`${styled.iconbtn} ${
                isPage === 3 ? styled.sel_icon : null
              }`}
              onClick={() => {
                onClickButton(2);
                dispatch(setPage(3));
              }}
            >
              <img
                src={`${
                  isPage === 3
                    ? "assets/sel_search.png"
                    : "assets/unsel_search.png"
                }`}
                alt=""
              />
              검색
            </div>
            <div
              className={`${styled.iconbtn} ${
                isPage === 4 ? styled.sel_icon : null
              }`}
              onClick={() => {
                const AccessToken=localStorage.getItem('AccessToken')
                if (!AccessToken) {
                  alert('로그인이 필요한 기능입니다')
                  navigate('/login')
                  return
                }
                onClickButton(3);
                dispatch(setPage(4));
              }}
            >
              <img
                src={`${
                  isPage === 4 ? "assets/sel_like.png" : "assets/unsel_like.png"
                }`}
                alt=""
              />
              좋아요
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default BottomBar;
