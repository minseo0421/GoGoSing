import React, { useState, useRef } from "react";
import Cardstyles from "../MainContainer/MainContainer.module.css";
import MainStyles from "../../pages/ContainerBar.module.css";
import CardSmallContainer from "../CardSmall/CardSmallContainer";
import PitchLong from "../CardRecord/PitchLong";
import VoiceLong from "../CardRecord/VoiceLong";

const MainContainer: React.FC = () => {
  const [startY, setStartY] = useState(0);
  const [scrollTop, setscrollTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    const y = "touches" in e ? e.touches[0].pageY : e.pageY;

    if (containerRef.current) {
      setStartY(y);
      setscrollTop(containerRef.current.scrollTop);
      setIsDragging(true);
    }
  };

  const handleMove = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !containerRef.current) return;

    const y = "touches" in e ? e.touches[0].pageY : e.pageY;
    const walk = y - startY;
    containerRef.current.scrollTop = scrollTop - walk;
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  /* onTouch 관련은 Mobile 환경에서 터치가 있을 때, onMouse는 Web 환경에서 Mobile 처럼 클릭하고 이동 할 때의 케이스 */
  return (
    <div
      className={Cardstyles.container}
      ref={containerRef}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className={MainStyles.pitch}>🍪내가 만든 http only 쿠키 ~🍪</div>
      <CardSmallContainer></CardSmallContainer>
      <div className={MainStyles.pitch}>🕒왓츠 유얼 ETA 왓챠 PPAP ~🕒</div>
      <CardSmallContainer></CardSmallContainer>
      <div className={MainStyles.pitch}>
        🎼당신의 음역대에 맞는 노래입니다 !🎼
      </div>
      <PitchLong></PitchLong>
      <div className={MainStyles.pitch}>
        🎤당신의 목소리에 맞는 노래에요 !🎤
      </div>
      <VoiceLong></VoiceLong>
    </div>
  );
};

export default MainContainer;
