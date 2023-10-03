import React, { useState, useRef, useEffect } from "react";
import Cardstyles from "../MainContainer/MainContainer.module.css";
import CardSmallContainer from "../CardSmall/CardSmallContainer";
import PitchLong from "../CardRecord/PitchLong";
import VoiceLong from "../CardRecord/VoiceLong";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import { useDispatch } from "react-redux";
import { setLike } from "../../store/actions";

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
  const navigate = useNavigate()
  const [likechart, setlikechart] = useState<AlbumProps[]>([])
  const dispatch = useDispatch()
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

  useEffect(()=>{
    const AccessToken = localStorage.getItem('AccessToken')
    axiosInstance({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/music/like`,
      headers:{
        Authorization:`Bearer ${AccessToken}`
      }
    }).then(res=>{
      const likelist = res.data.map((item:{musicId:number,singer:string,songImg:string|null,title:string}) => item.musicId)
      dispatch(setLike(likelist))    
    }).catch(err=>{
      console.log(err)
    })
  },[dispatch])
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
      <div style={{display:'flex', width:'90%', margin:'0 5%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>🎶금주의 인기차트🎶</span>
        <span style={{fontSize:'16px'}} onClick={()=>{navigate('/chart?type=popular')}}>더보기</span>
      </div>
      <CardSmallContainer albums={likechart.slice(0,10)} />
      <div style={{display:'flex', width:'90%', margin:'0 5%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>❤️당신의 좋아요 추천 노래❤️</span>
        <span style={{fontSize:'16px'}} onClick={()=>{navigate('/chart?type=like')}}>더보기</span>
      </div>
      <CardSmallContainer albums={likechart.slice(0,10)} />

      <div style={{display:'flex', width:'90%', margin:'0 5%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>🎼당신의 음역대에 맞는 노래🎼</span>
        <span style={{fontSize:'16px'}} onClick={()=>{navigate('/chart?type=pitch')}}>더보기</span>
      </div>
      <PitchLong />
      <div style={{display:'flex', width:'90%', margin:'0 5%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>🎤당신의 목소리에 맞는 노래🎤</span>
        <span style={{fontSize:'16px'}} onClick={()=>{navigate('/chart?type=voice')}}>더보기</span>
      </div>
      <VoiceLong />
    </div>
  );
};

export default MainContainer;
