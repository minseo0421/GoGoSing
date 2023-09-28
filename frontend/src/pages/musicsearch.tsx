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
    <div style={{height:'100%', width:'100%'}}>
      <div className={styles.topbar}>
        <p>검색</p>
      </div>
      <div style={{ height: "90%", overflow: "auto" }}>
        {/* 여기가 메인 영역 */}
        <ReactPlayer url="https://www.youtube.com/watch?v=pSUydWEqKwE" />
        <iframe
          src="https://www.youtube.com/embed/pSUydWEqKwE"
          title="Spectre vulnerability Wikipedia page"
          width="960"
          height="600"
          referrerPolicy="no-referrer-when-downgrade" allow="encrypted-media" sandbox="allow-same-origin allow-scripts"></iframe>
      </div>
    </div>
  );
};
export default MusicSearch;
