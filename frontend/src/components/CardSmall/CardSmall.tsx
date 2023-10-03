import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./CardSmall.module.css";
import { setModal, setAlbum } from "../../store/actions";
import { useDispatch } from "react-redux";
import axiosInstance from "../../axiosinstance";

interface AlbumProps {
  album: {
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
    genreId:number[]|null;
    genreType:string|null;
  };
  like:boolean|null

}

const CardSmall: React.FC<AlbumProps> = ({ album,like }) => {
  const [islike, setLike] = useState<boolean|null>(null)
  const dispatch = useDispatch();

  const handleAlbumClick = () => {
    dispatch(setModal("musicDetail")); // 모달 표시 액션
    dispatch(setAlbum(album.musicId)); // 선택된 앨범 데이터 저장 액션
  };
  useEffect(()=>{
    setLike(like)
  },[like])

  const onLike = () => {
    const AccessToken = localStorage.getItem('AccessToken')
    axiosInstance({
      method: islike ? 'delete':'post',
      url:`${process.env.REACT_APP_API_URL}/music/like`,
      data:{
        musicId:album.musicId
      },
      headers:{
        Authorization:`Bearer ${AccessToken}`
      }
    }).then(res=>{
      setLike(!islike)
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className={styles.container}>
      <img crossOrigin="anonymous" onClick={handleAlbumClick} src={album.songImg ? album.songImg:'assets/default_album.png'} alt="" className={styles.image} />
      <div className={styles.infoContainer}>
        <div className={styles.musicinfo} onClick={handleAlbumClick}>
          <span className={styles.title}>{album.title}</span>
          <span>{album.singer}</span>
        </div>
        {islike===null ? null :
          islike===true ? (
            <AiFillHeart
              className={styles.icon}
              onClick={() => onLike()}
            />
          ) : (
            <AiOutlineHeart
              className={styles.icon}
              onClick={() => onLike()}
            />
          )}
      </div>
    </div>
  );
};

export default CardSmall;
