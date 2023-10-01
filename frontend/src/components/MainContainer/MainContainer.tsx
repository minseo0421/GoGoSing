import React, { useState, useRef, useEffect } from "react";
import Cardstyles from "../MainContainer/MainContainer.module.css";
import MainStyles from "../../pages/ContainerBar.module.css";
import CardSmallContainer from "../CardSmall/CardSmallContainer";
import PitchLong from "../CardRecord/PitchLong";
import VoiceLong from "../CardRecord/VoiceLong";
import axios from "axios";

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
  genreId:number[]|null;
  genreType:string|null;
}
const MainContainer: React.FC = () => {
  const [startY, setStartY] = useState(0);
  const [scrollTop, setscrollTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [likechart, setlikechart] = useState<AlbumProps[]>([])
  // 차트 정보 불러오는 axios 작성
  useEffect(()=>{
    axios({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/music/chart`,
    }).then(res=>{
      setlikechart(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

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
      <div className={MainStyles.pitch}>인기 차트</div>
      <CardSmallContainer albums={likechart.slice(0,10)} />
      <div className={MainStyles.pitch}>🕒왓츠 유얼 ETA 왓챠 PPAP ~🕒</div>
      <CardSmallContainer albums={likechart.slice(0,10)} />
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
