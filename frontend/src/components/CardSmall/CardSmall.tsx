import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./CardSmall.module.css";
import { setModal, setAlbum, setLike } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosinstance";
import { AppState } from "../../store/state";

interface AlbumProps {
  album :{
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
    genreInfo:{
      genreId:number[];
      genreType:string;
    }[];
    viewCount:number;
  }
}

const CardSmall: React.FC<AlbumProps> = ({ album }) => {
  const [imgErr, setImgErr] = useState<boolean>(false)
  const likelist = useSelector((state: AppState) => state.likelist);
  const dispatch = useDispatch();

  const handleAlbumClick = () => {
    dispatch(setModal("musicDetail")); // 모달 표시 액션
    dispatch(setAlbum(album.musicId)); // 선택된 앨범 데이터 저장 액션
  };

  const onLike = () => {
    const AccessToken = localStorage.getItem('AccessToken')
    axiosInstance({
      method: likelist?.includes(album.musicId) ? 'delete':'post',
      url:`${process.env.REACT_APP_API_URL}/music/like`,
      data:{
        musicId:album.musicId
      },
      headers:{
        Authorization:`Bearer ${AccessToken}`
      }
    }).then(res=>{
      if (likelist?.includes(album.musicId)) {
        dispatch(setLike(likelist!.filter(item => item !== album.musicId)))
      } else {
        dispatch(setLike([...likelist!,album.musicId]))
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className={styles.container}>
      {imgErr ? <img crossOrigin="anonymous"  onClick={handleAlbumClick} src='assets/default_album.png' alt="" className={styles.image} />
      :<img crossOrigin="anonymous"  onClick={handleAlbumClick} src={album?.songImg!} alt="" className={styles.image} onError={()=>setImgErr(true)} />}
        <div className={styles.infoContainer}>
        <div className={styles.musicinfo} onClick={handleAlbumClick}>
          <span className={styles.title}>{album.title}</span>
          <span>{album.singer}</span>
        </div>
        {likelist===null ? null :
          likelist.includes(album.musicId) ? (
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
