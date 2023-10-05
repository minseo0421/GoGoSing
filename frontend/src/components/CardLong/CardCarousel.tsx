import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./CardCarousel.module.css";
import { setModal, setAlbum, setLike } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosinstance";
import { AppState } from "../../store/state";

interface AlbumProps {
  album: {
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
  }
}

const CardCarousel: React.FC<AlbumProps> = ({ album }) => {
  const likelist = useSelector((state: AppState) => state.likelist);
  const dispatch = useDispatch(); // 이 위치로 변경
  const [imgErr, setImgErr] = useState<boolean>(false)
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
      <div style={{width:'30%', height:'100px', margin:'0 10px',boxSizing:'border-box'}}>
        {imgErr ? <img crossOrigin="anonymous"  onClick={handleAlbumClick} src='assets/default_album.png' alt="" className={styles.image} />
        :<img crossOrigin="anonymous" onClick={handleAlbumClick} src={album?.songImg!} alt="" className={styles.image} onError={()=>setImgErr(true)} />}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.musicinfo}  onClick={handleAlbumClick}>
          <div style={{backgroundColor:'white', width:'50px', borderRadius:"20px"}}>
            <span className={styles.title} style={{color:'black'}}>{album.musicId}</span>
          </div>
          <span className={styles.title}>{album.title}</span>
          <span>{album.singer}</span>
        </div>
        <div className="iconContainer">
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
    </div>
  );
};

export default CardCarousel;
