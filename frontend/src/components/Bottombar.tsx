import React from "react";
import { useLocation } from "react-router-dom";

interface BottomBarProps {
  onClickButton: (index: number) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onClickButton }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ||
      location.pathname === "/chart" ||
      location.pathname === "/search" ||
      location.pathname === "/like" ? (
        <div className="Navbar">
          <div className="icon">
            <div
              onClick={() => {
                onClickButton(0);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/mainHomeIcon.svg`}
                alt=""
              />
              홈
            </div>
            <div
              onClick={() => {
                onClickButton(1);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/musicChartIcon.svg`}
                alt=""
              />
              차트
            </div>
            <div
              onClick={() => {
                onClickButton(2);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/musicSearchIcon.svg`}
                alt=""
              />
              검색
            </div>
            <div
              onClick={() => {
                onClickButton(3);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/musicLikeIcon.svg`}
                alt=""
              />
              보관함
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default BottomBar;
