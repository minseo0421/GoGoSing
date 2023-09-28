import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./CardSmall.module.css";
import { setModal, selectAlbum } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

interface AlbumProps {
  album: {
    id: number;
    title: string;
    singer: string;
    image: any;
    url: string;
    lyrics: string;
  };
}

const CardSmall: React.FC<AlbumProps> = ({ album }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const handleAlbumClick = () => {
    dispatch(setModal("musicDetail")); // 모달 표시 액션
    dispatch(selectAlbum(album)); // 선택된 앨범 데이터 저장 액션
  };

  return (
    <div onClick={handleAlbumClick} className={styles.container}>
      <img src={album.image} alt="" className={styles.image} />
      <div className={styles.infoContainer}>
        <div className={styles.musicinfo}>
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
