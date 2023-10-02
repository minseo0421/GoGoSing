import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./CardSmall.module.css";
import { setModal, setAlbum } from "../../store/actions";
import { useDispatch } from "react-redux";

interface AlbumProps {
  album: {
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
    genreId:number[]|null;
    genreType:string|null;
  };
}

const CardSmall: React.FC<AlbumProps> = ({ album }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const handleAlbumClick = () => {
    dispatch(setModal("musicDetail")); // 모달 표시 액션
    dispatch(setAlbum(album.musicId)); // 선택된 앨범 데이터 저장 액션
  };

  return (
    <div className={styles.container}>
      <img crossOrigin="anonymous" onClick={handleAlbumClick} src={album.songImg ? album.songImg:'assets/default_album.png'} alt="" className={styles.image} />
      <div className={styles.infoContainer}>
        <div className={styles.musicinfo} onClick={handleAlbumClick}>
          <span className={styles.title}>{album.title}</span>
          <span>{album.singer}</span>
        </div>
        {liked ? (
          <AiFillHeart
            className={styles.icon}
            onClick={() => setLiked(false)}
          />
        ) : (
          <AiOutlineHeart
            className={styles.icon}
            onClick={() => setLiked(true)}
          />
        )}
      </div>
    </div>
  );
};

export default CardSmall;
