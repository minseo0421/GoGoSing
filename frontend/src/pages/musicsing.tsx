import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setAlbum, setModal } from "../store/actions";
import { AppState } from "../store/state";
import musicStyle from "./musicDetail.module.css";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import MusicPlay from '../components/musicrecord/musicplay';
import axiosInstance from "../axiosinstance";
import axios from "axios";
// import { blob } from "stream/consumers";

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
  lyricist: string,
  composer: string,
  songImg: string,
  releaseDate: string,
  lyric: string,
  mrUrl: string,
  musicUrl:string,
  musicPlayTime: string,
  genreId: number[]|null,
  genreType: string|null
}
const MusicSing: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen === "musicSing");
  const albumId = useSelector((state: AppState) => state.albumId);
  const [isPlay, setIsplay] = useState(false);
  const recorderControls = useAudioRecorder();
  const [isRecording, setIsRecording] = useState(false);
  const [audioSourceURL, setAudioSourceURL] = React.useState("");
  const [file, setFile] = useState<File | null>(null);
  const [album,setAlbumData] = useState<AlbumProps>()
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    if (albumId) {
      axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}/music/detail/${albumId}`
      }).then(res=>{
        console.log(res)
        setAlbumData(res.data)
        setIsplay(false);
      }).catch(err=>{
        alert('노래 상세정보 없음')
      })
    } 
  },[albumId])

    const handleStartRecording = () => {
        // 미디어 액세스 권한 확인 및 요청
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                // 권한 승인됨, 녹음 시작
                setIsRecording(true);
                console.log(isRecording)
                console.log(audioSourceURL)
                // 녹음을 시작하는 코드 추가
                recorderControls.startRecording();
            })
            .catch(function (error) {
                // 권한 거부 또는 오류 발생
                console.error('미디어 액세스 권한 확인 실패:', error);
                // 사용자에게 오류 메시지 표시
                alert('녹음 권한을 허용해야 녹음을 시작할 수 있습니다.');
            });
    };
    
    // 음원 합치기 코드 ver1.
    const getMergeMusic = async (blob: Blob) => {
      setLoading(true);
      const audioFile = new File([blob], 'audio.webm', { type: 'audio/webm' });
      console.log(audioFile)
      setFile(audioFile)
      const ytlink = album?.mrUrl;
      // const url = `https://www.youtube.com/watch?v=${ytlink}`;
      const url1 = 'https://www.youtube.com/watch?v='+ytlink;
      // const audioFile = recordingResultBlob ? recordingResultBlob : new Blob(); // recordingResultBlob가 정의되어 있지 않으면 빈 Blob을 사용
      if (audioFile) {
        const formData = new FormData();
        formData.append('file', audioFile);
        formData.append('url', url1);
        console.log(formData);
  
        try {
          const response = await axiosInstance({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/analyze/singingRoomResult`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`,
            },
          });
          console.log(response);
          console.log(response.data);
          setAudioSourceURL(response.data.voiceUrl);
          setLoading(false);
  
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('파일이 선택되지 않았습니다.');
        // setLoading(false)
      }
    }
    // 음원 합치기 코드
    // const getMergeMusic = async () => {
    //   setLoading(true);
    //   const ytlink = album?.mrUrl;
    //   console.log(ytlink);
    //   console.log(`youtube.com/watch?v=${ytlink}`);
    //   console.log('https://www.youtube.com/watch?v='+ytlink)
    //   // const url = `https://www.youtube.com/watch?v=${ytlink}`;
    //   const url = 'https://www.youtube.com/watch?v='+ytlink;
    //   console.log(file);
    //   if (file) {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('url', url);
    //     console.log(formData);
  
    //     try {
    //       const response = await axiosInstance({
    //         method: 'post',
    //         url: `${process.env.REACT_APP_API_URL}/analyze/singingRoomResult`,
    //         data: formData,
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`,
    //         },
    //       });
    //       console.log(response);
    //       console.log(response.data);
    //       setAudioSourceURL(response.data.voiceUrl);
    //       setLoading(false);
  
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   } else {
    //     console.log('파일이 선택되지 않았습니다.');
    //     // setLoading(false)
    //   }
    // }

    // useEffect(() => {
    //   // file 상태가 변경될 때마다 호출되는 콜백 함수
    //   if (file) {
    //     // file 상태가 변경되었을 때의 작업 수행
    //     console.log(file);
    //     // 다음 작업 수행
    //     getMergeMusic();
    //   }
    // }, [file]);

    const handleRestartRecording = () => {
      setAudioSourceURL("");
      setIsRecording(!isRecording);
      console.log(audioSourceURL)
      console.log(isRecording)
    };

    // 이 코드를 업로드 뿐만 아니라 아니라 음원 합치고, 그걸로 분석하게 해야함
    const MyrecordUpload = () => {
        if (file) {
          const formData = new FormData();
          formData.append('file', file); 
          console.log(formData)
          console.log(file)
  
          axiosInstance({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/music/analyze/rangeResult`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'accessToken': `Bearer ${localStorage.getItem("AccessToken")}`
            },
          })
            .then((res) => {
              console.log(res);
              alert('업로드 완료!')
            //   navigate("/uploadresult");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log('파일이 선택되지 않았습니다.');
        }
      };
    // const recordresult = () => {
    //     // navigate("/recordresult");
    // };

 
  const handlePlayPause = () => {
    if (isPlay) {
      // Pause the video
      setIsplay(false);
    } else {
      // Play the video
      setIsplay(true);
      setTimeout(() => {
        const iframe = document.querySelector<HTMLIFrameElement>("#yt");
        if (iframe) {
          const a=iframe.src
          iframe.setAttribute('credentialless','true')
          iframe.src=a
        }
      }, 500);
      
      
    }
  };

  // Render the modal
  if (!isModalOpen) {
    return null;
  }
  // 여기부터 터치 이벤트 관련 start

  // 터치 이벤트 end
  const recordStop = ()=>{
    recorderControls.stopRecording()
    setIsRecording(false)
    setIsplay(false);
    // setIsRecording(false); // 녹음 중지
    // 마이크 스트림을 가져올 때 사용한 스트림을 해제
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    })
    .catch((error) => {
      console.error('마이크 스트림 해제 오류:', error);
    });
  }

  return (
      <Background $imageUrl="../../assets/background.png">
        <CloseButton onClick={() => {dispatch(setAlbum(null)); dispatch(setModal(null))}}>
          닫기
        </CloseButton>
        <ModalContainer open={isModalOpen}>
        {loading ? (
          // 로딩 중일 때 표시할 내용
          <div>Loading...</div>
        ) : (
          <>
          <h1>SING</h1>
          <div style={{display:'flex', justifyContent:'start', width:'90%', alignItems:'center', height:'10%', marginTop:15, padding:'0 5px', backgroundColor:'rgba(255, 255, 255, 0.2)', borderRadius:20}}>
            <img crossOrigin="anonymous" src={album?.songImg} alt="" style={{height:'80%', borderRadius:10, marginRight:10}} />
            <div style={{textAlign:'start'}}>
              <div className={musicStyle.titleFont}>{album?.title}</div>
              <div className={musicStyle.singerFont}>{album?.singer}</div>
            </div>
          </div>
          
          <div style={{width:'100%', height:'250px',backgroundColor:'black', marginTop:10}}>
            {isPlay && <iframe title='yt' id='yt' width='100%' height='250' allow={'autoplay'} src={`https://yewtu.be/embed/${album?.mrUrl}`} frameBorder={0} allowFullScreen style={{pointerEvents:'none'}}
             onLoad={()=>{
              // 영상 로딩 시작 시 녹음시작
              handleStartRecording()
             }}
             />}
          </div>
          <div style={{ display: 'none' }}>
            <AudioRecorder
            onRecordingComplete={getMergeMusic}
            recorderControls={recorderControls}
            // showVisualizer={true}
            // downloadOnSavePress={true}
          />
          </div>
          <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center', marginBottom: 24 }}>
                {!isRecording && audioSourceURL==="" && (
                <div style={{ margin: 'auto', marginBottom: '10px' }}>
                  <img onClick={()=>{handlePlayPause()}} src="assets/colmic.png" alt=""  style={isPlay ? {display:'none', }:{width: '40%',margin:'auto'}} />
                </div>
                )}
                {isRecording && audioSourceURL==="" && (
                <div>
                    <p>{recorderControls.recordingTime}</p>
                    <p onClick={recordStop}>녹음 멈춰!!</p>
                </div>
                )}
                {audioSourceURL && (
                    <MusicPlay audioSourceURL= {audioSourceURL}/>
                    )}
                    {isRecording && audioSourceURL && (
                    <button onClick={handleRestartRecording} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>다시 부르기</button>
                    )}
                    {isRecording && audioSourceURL&&(
                    <button onClick={MyrecordUpload} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>
                        이 노래로 목소리 분석하기
                    </button>
                    )}
            </div>
            </>
            )}
        </ModalContainer>
      </Background>
  );
};

export default MusicSing;