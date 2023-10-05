import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./CardLiked.module.css";
import { setModal, setAlbum } from "../../store/actions";
import { useDispatch } from "react-redux";
import axiosInstance from "../../axiosinstance";

interface AlbumProps {
  album: {
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
  }
}

const CardLong: React.FC<AlbumProps> = ({ album }) => {
  const dispatch = useDispatch(); // 이 위치로 변경
  const [islike, setLike] = useState<boolean | null>(null);

  const handleAlbumClick = () => {
    dispatch(setModal("musicDetail")); // 모달 표시 액션
    dispatch(setAlbum(album.musicId)); // 선택된 앨범 데이터 저장 액션
  };

  const onLike = () => {
    const AccessToken = localStorage.getItem("AccessToken");
    axiosInstance({
      method: islike ? "delete" : "post",
      url: `${process.env.REACT_APP_API_URL}/music/like`,
      data: {
        musicId: album.musicId,
      },
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    })
      .then((res) => {
        setLike(!islike);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <img
        crossOrigin="anonymous"
        onClick={handleAlbumClick}
        src={album.songImg ? album.songImg : "assets/default_album.png"}
        alt=""
        className={styles.image}
      />
      <div className={styles.infoContainer}>
        <div className={styles.musicinfo} onClick={handleAlbumClick}>
          <div
            style={{
              backgroundColor: "white",
              width: "50px",
              borderRadius: "20px",
            }}
          >
            <span className={styles.title} style={{ color: "black" }}>
              {album.musicId}
            </span>
          </div>
          <span className={styles.title}>{album.title}</span>
          <span>{album.singer}</span>
        </div>
        <div className="iconContainer">
          {islike === null ? null : islike === true ? (
            <AiFillHeart className={styles.icon} onClick={() => onLike()} />
          ) : (
            <AiOutlineHeart className={styles.icon} onClick={() => onLike()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardLong;
