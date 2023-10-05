import React, { useEffect, useState } from "react";
import CardLongContainer from "../components/CardLong/CardLongContainer";
import styles from "./musicchart.module.css";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import axiosInstance from "../axiosinstance";
import { useNavigate } from "react-router-dom";

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
}
const MusicChart: React.FC = () => {
  const [chartpage, setChartPage] = useState('인기차트')
  const [albums, setAlbums] = useState<AlbumProps[]>([])
  const [nodata, setNodata] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    const params = new URL(document.location.toString()).searchParams;
    const type = params.get('type')

    if (type==='popular' || !type) {
      setChartPage('인기차트')
      axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}/music/chart`,
      }).then(res=>{
        setAlbums(res.data)
      }).catch(err=>{
        console.log(err)
      })
    } else {
      if (type==='voice') {
        setChartPage('목소리추천')
      } else if (type==='pitch') {
        setChartPage('음역대추천')
      } else if (type==='like') {
        setChartPage('좋아요추천')
      }
      const AccessToken = localStorage.getItem('AccessToken')
      const page = type==='like' ? '/music/like/list':  type==='pitch' ? '/analyze/rangeMusicList':  '/analyze/waveMusicList'
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
  },[])

  const setlist = (name:string) =>{
    if (name==='인기차트') {
      axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}/music/chart`,
      }).then(res=>{
        setAlbums(res.data)
        setChartPage(name)
      }).catch(err=>{
        console.log(err)
      })
    } else {
      const AccessToken = localStorage.getItem('AccessToken')

      if (AccessToken) {
        const page = name==='좋아요추천' ? '/music/like/list':  name==='음역대추천' ? '/analyze/rangeMusicList': '/analyze/waveMusicList'
        axiosInstance({
          method:'get',
          url:`${process.env.REACT_APP_API_URL}${page}`,
          headers:{
            Authorization:`Bearer ${AccessToken}`
          }}).then(res=>{
            setAlbums(res.data)
            if (name==='좋아요추천') {
              if (res.data.length === 0) {
                setNodata(true)
              } else {
                setNodata(false)
              }
            }
            setChartPage(name)
              
        }).catch(err=>{
          console.log(err)
          if (name ==='음역대추천') {
            alert('음역대 추천 데이터없음')
            navigate('/record')
          } else if (name ==='목소리추천') {
            alert('목소리 추천 데이터없음')
            navigate('/musicupload')
          } 
        })
      } else {
        alert('로그인이 필요한 기능입니다.')
        navigate('/login')
      }
    }
  }
  
  useEffect(() => {
    dispatch(setPage(2));
  }, [dispatch]);
  return (
    <div style={{height:'100%', width:'100%'}}>
      <div className={styles.topbar}>
        <span style={{fontSize:'20px',marginBottom:'5px'}}>{chartpage}</span>
        <span style={{display:'flex', width:'100%',justifyContent:'space-between'}}>
          <span onClick={()=>{setlist('인기차트')}} style={chartpage==='인기차트' ? {borderBottom:'2px solid white'}:{}}>인기차트</span>
          <span onClick={()=>{setlist('목소리추천')}} style={chartpage==='목소리추천' ? {borderBottom:'2px solid white'}:{}}>목소리추천</span>
          <span onClick={()=>{setlist('음역대추천')}} style={chartpage==='음역대추천' ? {borderBottom:'2px solid white'}:{}}>음역대추천</span>
          <span onClick={()=>{setlist('좋아요추천')}} style={chartpage==='좋아요추천' ? {borderBottom:'2px solid white'}:{}}>좋아요추천</span>
        </span>
      </div>
      <div style={{height:'87%',marginTop:'3%', overflow:'auto'}}>
        {nodata && chartpage==='좋아요추천' && <p style={{fontSize:18, backgroundColor:'rgba(240, 248, 255,0.2)', borderRadius:20, width:'80%', marginLeft:'10%', padding:'10px'}}>조회 결과가 없습니다.😭 <br /> 좋아요를 누르고 추천을 받아보세요!</p> }
        <CardLongContainer albums={albums} />
      </div>
    </div>
  );
};
export default MusicChart;
