import React, { useEffect, useState } from "react";
import CardLongContainer from "../components/CardLong/CardLongContainer";
import styles from "./musicchart.module.css";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

interface AlbumProps {
  musicId:number;
  title:string;
  singer:string|null;
  songImg:string|null;
  genreId:number[]|null;
  genreType:string|null;
}

const MusicChart: React.FC = () => {
  const [chartpage, setChartPage] = useState('인기차트')
  const [albums, setAlbums] = useState<AlbumProps[]>([])
  const dispatch = useDispatch();

  useEffect(()=>{
    axios({
      method:'get',
      url:`${process.env.REACT_APP_API_URL}/music/chart`,
    }).then(res=>{
      setAlbums(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[chartpage])
  
  useEffect(() => {
    dispatch(setPage(2));
  }, [dispatch]);
  return (
    <div style={{height:'100%', width:'100%'}}>
      <div className={styles.topbar}>
        <span style={{fontSize:'20px',marginBottom:'5px'}}>{chartpage}</span>
        <span style={{display:'flex', width:'100%',justifyContent:'space-between'}}>
          <span onClick={()=>setChartPage('인기차트')}>인기차트</span>
          <span onClick={()=>setChartPage('목소리추천')}>목소리추천</span>
          <span onClick={()=>setChartPage('음역대추천')}>음역대추천</span>
          <span onClick={()=>setChartPage('무엇추천')}>무엇추천</span>
        </span>
      </div>
      <div style={{height:'90%', overflow:'auto'}}>
        <CardLongContainer albums={albums} />
      </div>
    </div>
  );
};
export default MusicChart;
