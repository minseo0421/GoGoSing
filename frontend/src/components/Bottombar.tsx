import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from './bar.module.css';

interface BottomBarProps {
  onClickButton: (index: number) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onClickButton }) => {
  const location = useLocation();
  const [isBtn, setBtn] = useState(1);

  return (
    <>
      {location.pathname === "/" ||
      location.pathname === "/chart" ||
      location.pathname === "/search" ||
      location.pathname === "/like" ? (
        <div className={styled.Navbar}>
          <div className={styled.iconbar}>
            <div className={`${styled.iconbtn} ${isBtn === 1 ? styled.sel_icon : null}`} 
              onClick={() => {
                onClickButton(0);
                setBtn(1)
              }}>
              <img src={`${isBtn===1 ? `assets/sel_home.png`:`assets/unsel_home.png`}`} alt="" />
              홈
            </div>
            <div  className={`${styled.iconbtn} ${isBtn === 2 ? styled.sel_icon : null}`}
              onClick={() => {
                onClickButton(1);
                setBtn(2)
              }}
            >
              <img
                src={`${isBtn===2 ? `assets/sel_chart.png`:`assets/unsel_chart.png`}`}
                alt=""
              />
              차트
            </div>
            <div  className={`${styled.iconbtn} ${isBtn === 3 ? styled.sel_icon : null}`}
              onClick={() => {
                onClickButton(2);
                setBtn(3)
              }}
            >
              <img
                src={`${isBtn===3 ? `assets/sel_search.png`:`assets/unsel_search.png`}`}
                alt=""
              />
              검색
            </div>
            <div  className={`${styled.iconbtn} ${isBtn === 4 ? styled.sel_icon : null}`}
              onClick={() => {
                onClickButton(3);
                setBtn(4)
              }}
            >
              <img
                src={`${isBtn===4 ? `assets/sel_like.png`:`assets/unsel_like.png`}`}
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
