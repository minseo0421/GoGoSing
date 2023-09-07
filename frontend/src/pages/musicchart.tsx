import React from "react";
import CardLongContainer from "../components/CardLongContainer";
import styles from "./ContainerBar.module.css";

const MusicChart: React.FC = () => {
  return (
    <div>
      <div className={styles.pitch}>🍪내가 만든 http only 쿠키 ~🍪</div>
      <CardLongContainer></CardLongContainer>
    </div>
  );
};
export default MusicChart;
