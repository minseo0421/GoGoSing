import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./AlbumCardSmall.module.css";

const AlbumCardSmall: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.container}>
      <img src="assets/sample1.svg" alt="" className={styles.image} />
      <div className={styles.infoContainer}>
        <div className={styles.musicinfo}>
          <span className={styles.title}>Super 슈퍼슈퍼슈퍼 Shy</span>
          <span>NewJeans</span>
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

export default AlbumCardSmall;
