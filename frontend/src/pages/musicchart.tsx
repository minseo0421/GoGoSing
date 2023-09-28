import React, { useEffect } from "react";
import CardLongContainer from "../components/CardLong/CardLongContainer";
import styles from "./musicchart.module.css";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";

const MusicChart: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(2));
  }, [dispatch]);
  return (
    <div style={{height:'100%', width:'100%'}}>
      <div  className={styles.topbar}>
        <p>차트</p>
      </div>
      <div style={{height:'90%', overflow:'auto'}}>
        <div className={styles.pitch}>🍪내가 만든 http only 쿠키 ~🍪</div>
        <CardLongContainer></CardLongContainer>
      </div>
    </div>
  );
};
export default MusicChart;
