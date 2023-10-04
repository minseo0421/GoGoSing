import React, { useEffect, useState } from "react";
import CardLongContainer from "../components/CardLong/CardLongContainer";
import styles from "./musicchart.module.css";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import axiosInstance from "../axiosinstance";

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
  genreInfo:{
    genreId:number[];
    genreType:string;
  }[];
  viewCount:number;
}
const MusicChart: React.FC = () => {
  const [chartpage, setChartPage] = useState('인기차트')
  const [albums, setAlbums] = useState<AlbumProps[]>([])
  const dispatch = useDispatch();

  useEffect(()=>{
    const params = new URL(document.location.toString()).searchParams;
    const type = params.get('type')
    if (type==='popular') {
      setChartPage('인기차트')
    } else if (type==='voice') {
      setChartPage('목소리추천')
    } else if (type==='pitch') {
      setChartPage('음역대추천')
    } else if (type==='like') {
      setChartPage('좋아요추천')
    }
  },[])
  useEffect(()=>{
    if (chartpage==='인기차트') {
      axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}/music/chart`,
      }).then(res=>{
        setAlbums(res.data)
      }).catch(err=>{
        console.log(err)
      })
    } else {
      const AccessToken = localStorage.getItem('AccessToken')
      const page = chartpage==='좋아요추천' ? '/music/like/list':  chartpage==='음역대추천' ? '/analyze/rangeMusicList': '/analyze/waveMusicList'
      axiosInstance({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}${page}`,
        headers:{
          Authorization:`Bearer ${AccessToken}`
        }}).then(res=>{
        setAlbums(res.data)
      }).catch(err=>{
        console.log(err)
      })
    }
  },[chartpage])
  
  useEffect(() => {
    dispatch(setPage(2));
  }, [dispatch]);
  return (
    <div style={{height:'100%', width:'100%'}}>
      <div className={styles.topbar}>
        <span style={{fontSize:'20px',marginBottom:'5px'}}>{chartpage}</span>
        <span style={{display:'flex', width:'100%',justifyContent:'space-between'}}>
          <span onClick={()=>setChartPage('인기차트')} style={chartpage==='인기차트' ? {borderBottom:'2px solid white'}:{}}>인기차트</span>
          <span onClick={()=>setChartPage('목소리추천')} style={chartpage==='목소리추천' ? {borderBottom:'2px solid white'}:{}}>목소리추천</span>
          <span onClick={()=>setChartPage('음역대추천')} style={chartpage==='음역대추천' ? {borderBottom:'2px solid white'}:{}}>음역대추천</span>
          <span onClick={()=>setChartPage('좋아요추천')} style={chartpage==='좋아요추천' ? {borderBottom:'2px solid white'}:{}}>좋아요추천</span>
        </span>
      </div>
      <div style={{height:'87%',marginTop:'3%', overflow:'auto'}}>
        <CardLongContainer albums={albums} />
      </div>
    </div>
  );
};
export default MusicChart;
