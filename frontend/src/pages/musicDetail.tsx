import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/actions";
import { AppState } from "../store/state";
import musicStyle from "./musicDetail.module.css";

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

const Background = styled.div<{ imageUrl: string }>`
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${(props) => props.imageUrl});
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  /* border-radius: 15px; */
  z-index: 1000;
  /* width: 100vw;
  height: 100vh; */
`;

const CloseButton = styled.button`
  position: absolute;
  color: white;
  text-align: right;
  margin-right: 25px;
  z-index: 9999;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  /* position: absolute; */
  top: 10px;
  left: 5px;
`;

const ModalContainer = styled.div<{ open: boolean }>`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${(props) => (props.open ? slideUp : slideDown)} 0.3s forwards;
`;

type MusicDetailProps = {
  windowWidth: number;
  windowHeight: number;
};

const MusicDetail: React.FC<MusicDetailProps> = ({
  windowWidth,
  windowHeight,
}) => {
  // 상태 관리자를 통한 열기 + 앨범 정보 가져오기
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: AppState) => state.isModalOpen === "musicDetail"
  );
  const album = useSelector((state: AppState) => state.album);
  const [isPlay, setIsplay] = useState(false);

  /*  유튜브 관련 코드 
  1. 위 프로젝트는 유튜브 URL을 크롤링해와서 사용. 그래서 URL에서 YoutubeID 를 분리해주는 작업이 videoId 변수 !
  2. typescript에서 YT (유튜브 iframeAPI) 에 대한 타입을 인식을 못 한다. 
    그래서 src/types 디렉토리를 만들어준 후, global.d.ts 를 만들어서 YT의 타입과, YT iframe이 가진
    play,pause의 type또한 타입 선언 (Declaration) 해주는 과정 필요. (상세한건 src/types/global.d.ts 참조)
  */
  const youtubeRef = useRef(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    if (window.YT && window.YT.Player) {
      const youtubeURL = `${album.url}`;
      const videoId = youtubeURL.split("v=")[1];
      const ytPlayer = new (window.YT as any).Player(youtubeRef.current, {
        height: "0",
        width: "0",
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
        },
      });
      setPlayer(ytPlayer);
      return () => {
        ytPlayer.destroy();
      };
    } else {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isModalOpen]);

  // render 되자마자 자동 재생하려면 이벤트 주석 해제
  function onPlayerReady(event: any) {
    // event.target.playVideo();
  }

  // 재생, 정지
  const handlePlayPause = () => {
    if (!player) return;

    if (isPlay) {
      player.pauseVideo();
      setIsplay(false);
    } else {
      player.playVideo();
      setIsplay(true);
    }
  };

  if (!isModalOpen) {
    return null;
  }
  // 여기부터 터치 이벤트 관련 start

  // 터치 이벤트 end

  return (
    <div style={{ width: windowWidth, height: windowHeight }}>
      <Background imageUrl="../../assets/background.png">
        <CloseButton onClick={() => dispatch(setModal(null))}>닫기</CloseButton>
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
                  onClick={handlePlayPause} // 추가
                />
                <img src="/assets/nextSong.png" alt="" />
              </div>
            </div>
            <div className={musicStyle.lyricsContainer}>
              <p className={musicStyle.lyrics}>{album.lyrics}</p>
            </div>
            <div ref={youtubeRef}></div> {/* YouTube Player를 위한 ref */}
          </div>
        </ModalContainer>
      </Background>
    </div>
  );
};

export default MusicDetail;
