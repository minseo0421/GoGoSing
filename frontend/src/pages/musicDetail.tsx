import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setAlbum, setLike, setModal } from "../store/actions";
import { AppState } from "../store/state";
import musicStyle from "./musicDetail.module.css";
import YouTube from "react-youtube";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axiosInstance from "../axiosinstance";
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const Background = styled.div<{ $imageUrl: string }>`
  opacity: 1;
  position: fixed;
  width:100%;
  height:100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${(props) => props.$imageUrl});
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  color: white;
  text-align: right;
  z-index: 9999;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  top: 40px;
  right: 20px;
`;

const ModalContainer = styled.div<{ open: boolean }>`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${(props) => (props.open ? slideUp : slideDown)} 0.3s forwards;
`;

interface AlbumProps {
  musicId: number,
  title: string,
  singer: string,
  lyricist: string|null,
  composer: string|null,
  songImg: string,
  releaseDate: string|null,
  lyric: string|null,
  mrUrl: string|null,
  musicUrl:string
  musicPlayTime: string|null,
  genreInfo:{
    genreId: number,
    genreType: string
  }[],
  viewCount:number;
}

const MusicDetail: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen === "musicDetail");
  const likelist = useSelector((state: AppState) => state.likelist);
  const albumId = useSelector((state: AppState) => state.albumId);
  const [isPlay, setIsplay] = useState(false);
  const [album,setAlbumData] = useState<AlbumProps>()
  const [control, setControl] = useState<boolean>(false)
  const [imgErr, setImgErr] = useState<boolean>(false)

  const onLike = () => {
    const AccessToken = localStorage.getItem('AccessToken')
    axiosInstance({
      method: likelist?.includes(album!.musicId) ? 'delete':'post',
      url:`${process.env.REACT_APP_API_URL}/music/like`,
      data:{
        musicId:album!.musicId
      },
      headers:{
        Authorization:`Bearer ${AccessToken}`
      }
    }).then(res=>{
      if (likelist?.includes(album!.musicId)) {
        dispatch(setLike(likelist!.filter(item => item !== album!.musicId)))
      } else {
        dispatch(setLike([...likelist!,album!.musicId]))
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    setControl(false)
    if (albumId) {
      axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}/music/detail/${albumId}`
      }).then(res=>{
        setAlbumData(res.data)
        setIsplay(false);
        setTimeout(() => {
        const iframe = document.querySelector<HTMLIFrameElement>("#yt");
        if (iframe) {
          const a=iframe.src
          iframe.setAttribute('credentialless','true')
          iframe.src=a
        }
        }, 500);
        setTimeout(() => {
          setControl(true)
        }, 1000);
        
      }).catch(err=>{
        alert('노래 상세정보 없음')
      })
    } 
  },[albumId])

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      origin: window.location.origin,
    },
  };

  const youtubeRef = React.useRef<YouTube | null>(null);
  const handlePlayPause = () => {
    if (isPlay) {
      // Pause the video
      youtubeRef.current?.getInternalPlayer().pauseVideo();
      setIsplay(false);
    } else {
      // Play the video
      youtubeRef.current?.getInternalPlayer().playVideo();
      setIsplay(true);
    }
  };

  // Render the modal
  if (!isModalOpen) {
    return null;
  }

  return (
      <Background $imageUrl="../../assets/background.png">
        <CloseButton onClick={() => {dispatch(setAlbum(null)); dispatch(setModal(null))}}>
          닫기
        </CloseButton>
        <ModalContainer open={isModalOpen}>
        {imgErr ? <img crossOrigin="anonymous" src='assets/default_album.png' alt="" className={musicStyle.blur} style={{
              width: "105%",}}/>
          :<img crossOrigin="anonymous" src={album?.songImg} alt="" className={musicStyle.blur} style={{
            width: "105%",
          }} onError={()=>setImgErr(true)} />}
          <div className={musicStyle.musicContainer}>
            <div className={musicStyle.titleFont}>{album?.title}</div>
            <div className={musicStyle.singerFont}>{album?.singer}</div>
            {imgErr ? <img crossOrigin="anonymous" src='assets/default_album.png' alt="" className={musicStyle.musicImage}  />
            :<img crossOrigin="anonymous" src={album?.songImg} alt="" className={musicStyle.musicImage}  onError={()=>setImgErr(true)} />}
              <div hidden>
                <YouTube id='yt' ref={youtubeRef} videoId={album?.musicUrl} opts={opts} onEnd={()=>{
                  setIsplay(false)
                }} />
              </div>
              <div className={musicStyle.iconContainer}>
                  {!album ? null : likelist===null ? <p></p> :
                likelist.includes(album.musicId) ? (
                  <AiFillHeart
                    className={musicStyle.icon}
                    onClick={() => onLike()}
                  />
                ) : (
                  <AiOutlineHeart
                    className={musicStyle.icon}
                    onClick={() => onLike()}
                  />
                )}
                  {control ? 
                  <img
                    src={isPlay ? "/assets/pause.png" : "/assets/play.png"}
                    alt="play/pause"
                    onClick={handlePlayPause}
                  />
                  :<p>Loading...</p>}
                  {album?.mrUrl===null ? <span></span>:
                  <img
                  src={"/assets/gosing.svg"}
                  alt="gogosing"
                  onClick={()=>{dispatch(setModal('musicSing'))}}/>}
                </div>
            </div>
            <div className={musicStyle.lyricsContainer}>
              {album?.lyric ? 
              <p className={musicStyle.lyrics}>
              {album?.lyric.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>))}
              </p>
              :
              <p className={musicStyle.lyrics}>
                <h2>가사 정보가 없습니다.</h2>
              </p>}
              
            </div>
          
        </ModalContainer>
      </Background>
  );
};

export default MusicDetail;
