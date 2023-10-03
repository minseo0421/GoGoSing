import React, { useEffect, useState } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
import RecordStyle from "../components/CardRecord/RecordSmall.module.css";
import styles from "./musiclike.module.css";
import BarStyle from "./ContainerBar.module.css";
import PitchSmall from "../components/CardRecord/PitchSmall";
import VoiceSmall from "../components/CardRecord/VoiceSmall";
import CardLikedContainer from "../components/CardLiked/CardLikedContainer";
import axiosInstance from "../axiosinstance";

interface AlbumProps {
  musicId: number;
  title: string;
  singer: string | null;
  songImg: string | null;
  genreId: number[] | null;
  genreType: string | null;
}

const MusicLike: React.FC = () => {
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  useEffect(() => {
    dispatch(setPage(4));
  }, [dispatch]);

  useEffect(() => {
    axiosInstance({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/music/like`,
      headers: {
        accessToken: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    })
      .then((res) => {
        setAlbums(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={styles.topbar}>
        <p>보관함</p>
      </div>
      <div style={{ height: "90%", overflow: "scroll" }}>
        <div className={RecordStyle.largeContainer}>
          <PitchSmall />
          <VoiceSmall />
        </div>
        <div>
          <div className={BarStyle.pitch}>❤️ 내가 좋아요 한 노래 !❤️</div>
          <CardLikedContainer albums={albums}></CardLikedContainer>
        </div>
      </div>
    </div>
  );
};
export default MusicLike;
