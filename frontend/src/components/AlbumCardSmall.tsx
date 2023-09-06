import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./AlbumCardSmall.module.css";

const AlbumCardSmall: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.container}>
      <img src="assets/sample1.svg" alt="" className={styles.image} />
      <div className={styles.infoContainer}>
        <div>
          <p className={styles.title}>Super Shy</p>
          <p>NewJeans</p>
        </div>
        <div className={styles.iconContainer}>
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
    </div>
  );
};

export default AlbumCardSmall;
