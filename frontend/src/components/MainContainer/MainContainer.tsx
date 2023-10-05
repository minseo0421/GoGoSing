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
import CarouselComponent from "../Carousel";

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
}

const MainContainer: React.FC = () => {
  const [startY, setStartY] = useState(0);
  const [scrollTop, setscrollTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate()
  const [popularchart, setpopularchart] = useState<AlbumProps[]>([])
  const [likechart, setlikechart] = useState<AlbumProps[]>([])
  const [plusview, setplusview] = useState(false);
  const dispatch = useDispatch()
  const AccessToken = localStorage.getItem('AccessToken')
  // 차트 정보 불러오는 axios 작성
  useEffect(()=>{
    const AccessToken = localStorage.getItem('AccessToken')
    axios({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/music/chart`,
    }).then(res=>{
      setpopularchart(res.data)
    }).catch(err=>{
      console.log(err)
    })
    axiosInstance({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/music/like/list`,
      headers:{
        Authorization:`Bearer ${AccessToken}`
      }
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
        <span style={{fontSize:'20px'}}>노래방 인기차트🎶</span>
        <span style={{fontSize:'16px'}} onClick={()=>{navigate('/chart?type=popular')}}>더보기</span>
      </div>
      <CardSmallContainer albums={popularchart.slice(0,10)} />
      <div style={{display:'flex', width:'90%', margin:'0 5%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>이 노래는 어떠신가요?</span>
      </div>
      <CarouselComponent />
      <div style={{display:'flex', width:'90%', margin:'0 5%', marginTop:'-10%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>장르별 인기차트</span>
      </div>
      <div style={{display:'flex', width:'90%', margin:'2% 5%', justifyContent:'space-between',alignItems:'center'}}>
        <div onClick={()=>{navigate('/genremusic?type=발라드')}} style={{backgroundColor:'#FFBD59',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>발라드</div> 
        <div onClick={()=>{navigate('/genremusic?type=댄스')}} style={{backgroundColor:'#52A7D7',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>댄스</div> 
        <div onClick={()=>{navigate('/genremusic?type=POP')}} style={{backgroundColor:'#8984B7',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>POP</div>
      </div>
      <div style={{display:'flex', width:'90%', margin:'2% 5%', justifyContent:'space-between',alignItems:'center'}}>
        <div onClick={()=>{navigate('/genremusic?type=랩/힙합')}} style={{backgroundColor:'#545454',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>랩/힙합</div> 
        <div onClick={()=>{navigate('/genremusic?type=RnB/Soul')}} style={{backgroundColor:'#9D5E3A',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>R&B/Soul</div> 
        <div onClick={()=>{navigate('/genremusic?type=인디음악')}} style={{backgroundColor:'#CBC5B3',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>인디음악</div>
      </div>

      {plusview ? 
      <>
        <div style={{display:'flex', width:'90%', margin:'2% 5%', justifyContent:'space-between',alignItems:'center'}}>
          <div onClick={()=>{navigate('/genremusic?type=락/메탈')}} style={{backgroundColor:'#DF3636',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>락/메탈</div> 
          <div onClick={()=>{navigate('/genremusic?type=포크/블루스')}} style={{backgroundColor:'#CF5405',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>포크/블루스</div> 
          <div onClick={()=>{navigate('/genremusic?type=OST')}} style={{backgroundColor:'#8CC4A9',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>OST</div>
        </div>
        <div style={{display:'flex', width:'90%', margin:'2% 5%', justifyContent:'space-between',alignItems:'center'}}>
          <div onClick={()=>{navigate('/genremusic?type=트로트')}} style={{backgroundColor:'#6260BF',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>트로트</div> 
          <div onClick={()=>{navigate('/genremusic?type=동요')}} style={{backgroundColor:'#FABE78',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>동요</div> 
          <div onClick={()=>{navigate('/genremusic?type=CCM')}} style={{backgroundColor:'#D4D3EA',width:'30%',height:'40px', justifyContent:'center',alignItems:'center', display:'flex',fontSize:'18px',borderRadius:10,border:'0.5px solid white'}}>CCM</div>
        </div>
      </>
      : null}
      {plusview ? <p onClick={()=>setplusview(false)} style={{margin:0,marginBottom:20}}>⇧ 숨기기</p>: <p onClick={()=>setplusview(true)} style={{margin:0,marginBottom:20}}>더보기 ⇩</p> }
      <div style={{display:'flex', width:'90%', margin:'0 5%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>당신의 목소리에 맞는 노래🎤</span>
        <span style={{fontSize:'16px'}} onClick={()=>{
          if (AccessToken) {
            navigate('/chart?type=voice')
          } else {
            alert('로그인이 필요합니다')
            navigate('/login')
          }}}>더보기</span>
      </div>
      <VoiceLong />
      <div style={{display:'flex', width:'90%', margin:'0 5%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>당신의 음역대에 맞는 노래🎼</span>
        <span style={{fontSize:'16px'}} onClick={()=>{
          if (AccessToken) {
            navigate('/chart?type=pitch')
          } else {
            alert('로그인이 필요합니다')
            navigate('/login')
          }}}>더보기</span>
      </div>
      <PitchLong />
      <div style={{display:'flex', width:'90%', margin:'0 5%', justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'20px'}}>당신의 좋아요 추천 노래❤️</span>
        <span style={{fontSize:'16px'}} onClick={()=>{
          if (AccessToken) {
            navigate('/chart?type=like')
          } else {
            alert('로그인이 필요합니다')
            navigate('/login')
          }
          }}>더보기</span>
      </div>
      <CardSmallContainer albums={likechart.slice(0,10)} />
    </div>
    
  );
};

export default MainContainer;
