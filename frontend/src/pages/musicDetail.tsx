import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/actions";
import { AppState } from "../store/state";
import musicStyle from "./musicDetail.module.css";
import YouTube from "react-youtube";

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

const MusicDetail: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen === "musicDetail");
  const album = useSelector((state: AppState) => state.album);
  const [isPlay, setIsplay] = useState(false);

  const youtubeURL = `${album.url}`;
  const videoId = youtubeURL.split("v=")[1]?.split("&")[0];

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      origin: window.location.origin,
    },
  };

  const youtubeRef = React.useRef<YouTube | null>(null);
  useEffect(()=>{
    setIsplay(false);
    if (isModalOpen) {
      setTimeout(() => {
        const iframe = document.querySelector<HTMLIFrameElement>("#yt");
        if (iframe) {
          // alert(iframe.src)
          const a=iframe.src
          iframe.setAttribute('credentialless','true')
          iframe.src=a
        }
      }, 500);
    }
  },[isModalOpen])
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
  // 여기부터 터치 이벤트 관련 start

  // 터치 이벤트 end

  return (
      <Background $imageUrl="../../assets/background.png">
        <CloseButton onClick={() => dispatch(setModal(null))}>
          닫기
        </CloseButton>
        <ModalContainer open={isModalOpen}>
          <div
            className={musicStyle.blur}
            style={{
              width: "105%",
              backgroundImage: `url(${album.image})`,
            }}
          ></div>
          <div className={musicStyle.musicContainer}>
            <img src={album.image} alt="" className={musicStyle.musicImage} />
            <div className={musicStyle.titleFont}>{album.title}</div>
            <div className={musicStyle.singerFont}>{album.singer}</div>
            <div>
              <div className={musicStyle.iconContainer}>
                <img src="/assets/previousSong.png" alt="" />
                <img
                  src={isPlay ? "/assets/pause.png" : "/assets/play.png"}
                  alt="play/pause"
                  onClick={handlePlayPause}
                />
                <img src="/assets/nextSong.png" alt="" />
                <YouTube id='yt' ref={youtubeRef} videoId={videoId} opts={opts} />
              </div>
            </div>
            <div className={musicStyle.lyricsContainer}>
              <p className={musicStyle.lyrics}>
              {album.lyrics.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>))}
              </p>
            </div>
          </div>
        </ModalContainer>
      </Background>
  );
};

export default MusicDetail;
