import React, { useEffect } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import styles from "./musicsearch.module.css";
import ReactPlayer from "react-player";

const MusicSearch: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(3));
  }, [dispatch]);
  return (
    <>
      <div className={styles.topbar}>
        <p>검색</p>
      </div>
      <div style={{ height: "75vh", overflow: "auto" }}>
        {/* 여기가 메인 영역 */}
        <ReactPlayer url="https://www.youtube.com/watch?v=pSUydWEqKwE" />
      </div>
    </>
  );
};
export default MusicSearch;
