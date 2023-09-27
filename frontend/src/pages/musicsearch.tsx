import React, { useEffect } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import styles from "./musicsearch.module.css";
import YouTube from "react-youtube";
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
        <YouTube
          videoId={"mHHW4_3Z--I"}
          opts={{
            width: "100",
            height: "100",
            playerVars: {
              autoplay: 0, //자동재생 O
              rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
              modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
            },
          }}
          //이벤트 리스너
          onEnd={(e) => {
            e.target.stopVideo(0);
          }}
        />
      </div>
    </>
  );
};
export default MusicSearch;
