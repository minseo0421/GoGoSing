import React, { useEffect, useState } from "react";
import CardLongContainer from "../components/CardLong/CardLongContainer";
import styles from "./musicchart.module.css";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";

const MusicChart: React.FC = () => {
  const [chartpage, setChartPage] = useState('인기차트')
  const dispatch = useDispatch();
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
      {chartpage==='인기차트' ? 
      <div style={{height:'90%', overflow:'auto'}}>
        <CardLongContainer/>
      </div>
      :
      chartpage==='목소리추천' ? 
      <div style={{height:'90%', overflow:'auto'}}>
        {/* <CardLongContainer></CardLongContainer> */}
      </div>
      :
      chartpage==='음역대추천' ? 
      <div style={{height:'90%', overflow:'auto'}}>
        <CardLongContainer/>
      </div>
      :
      chartpage==='무엇추천' ? 
      <div style={{height:'90%', overflow:'auto'}}>
        {/* <CardLongContainer/> */}
      </div>
      :
      null}
      
    </div>
  );
};
export default MusicChart;
