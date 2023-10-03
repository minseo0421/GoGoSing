import React, { useEffect, useState } from "react";

import { setPage } from "../store/actions";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinstance";
import RecordStyle from "../components/CardRecord/RecordSmall.module.css";

import styles from "./musiclike.module.css";

import BarStyle from "./ContainerBar.module.css";
import PitchSmall from "../components/CardRecord/PitchSmall";
import VoiceSmall from "../components/CardRecord/VoiceSmall";
import CardLikedContainer from "../components/CardLiked/CardLikedContainer";

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
    const token = localStorage.getItem("AccessToken");
    if (token) {
      getLikeList();
    }
  }, []);

  const getLikeList = async () => {
    try {
      const res = await axiosInstance({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/music/like`,
        headers: {
          accessToken: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      });
      setAlbums(res.data);
    } catch (error) {
      console.log("좋아요 노래 불러오기 에러");
    }
  };

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
