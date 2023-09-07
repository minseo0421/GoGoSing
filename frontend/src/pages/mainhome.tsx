import React from "react";
import CardSmallContainer from "../components/CardSmallContainer";
import styles from "./ContainerBar.module.css";

const MainHome: React.FC = () => {
  return (
    <div>
      <div className={styles.pitch}>🍪내가 만든 http only 쿠키 ~🍪</div>
      <CardSmallContainer></CardSmallContainer>
    </div>
  );
};
export default MainHome;
