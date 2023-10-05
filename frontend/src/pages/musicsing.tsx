import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setAlbum, setModal } from "../store/actions";
import { AppState } from "../store/state";
import musicStyle from "./musicDetail.module.css";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
// import MusicPlay from '../components/musicrecord/musicplay';
import axiosInstance from "../axiosinstance";
import axios from "axios";
import { AudioPlayer } from "../components/musicrecord/audioplay";
import { useNavigate } from "react-router-dom";


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
  const [audioSave, setAudioSave] = React.useState("");
  const [responseData, setResponseData] = useState<any | null>(null);
  const [imgErr, setImgErr] = useState<boolean>(false)
  const navigate = useNavigate();

  const handleAlbumClick = () => {
    dispatch(setModal("musicDetail"));
    dispatch(setAlbum(responseData.musicId)) // 모달 표시 액션
  };

  const Home = () => {
    navigate(-1); // 뒤로가기
  };

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
                setIsRecording(!isRecording);
                console.log(isRecording)
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
    // const setf =async (audioFile:any) => {
    //   setFile(audioFile);
    //   console.log(file)
    // } 
    const addAudio = async (blob: Blob) => {
      if (blob.size > 0) {  
      setIsRecording(true);
        // setIsRecording(false);
        const url = URL.createObjectURL(blob);
        setAudioSourceURL(url);
        // audioFile에 audio.webm을 할당
        const audioFile = new File([blob], 'audio.webm', { type: 'audio/webm' });
        // file을 audioFile로 변경
        setFile(audioFile)
        // await setf(audioFile)

 
        // await getMergeMusic()

      } else {
        console.log('Blob에 데이터가 없습니다.');
      }
    };
    
    // 음원 합치기 코드
    const getMergeMusic = async () => {
      setLoading(true);
      const ytlink = album?.mrUrl;
      // const url = `https://www.youtube.com/watch?v=${ytlink}`;
      const url = 'https://www.youtube.com/watch?v='+ytlink;
      console.log(file);
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('url', url);
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
          // console.log(response);
          setAudioSourceURL("");
          console.log(audioSourceURL)
          console.log(response.data.voiceUrl);
          setAudioSourceURL(response.data.voiceUrl);
          setAudioSave(response.data.voiceUrl);
          console.log(audioSourceURL)
          setLoading(false);
          alert('녹음 완료!')
  
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('파일이 선택되지 않았습니다.');
      }
    }
    // useEffect(() => {
    //   if (file) {
    //     console.log(file);
    //     // setLoading(false)
    //     getMergeMusic()
    //   }
    // }, [file]);

    useEffect(() => {
      if (audioSave) {
        console.log(audioSave);
        setLoading(false)
      }
    }, [audioSave]);

    const handleRestartRecording = () => {
      setAudioSourceURL("");
      setAudioSave("");
      setIsRecording(!isRecording);
      console.log(audioSourceURL)
      console.log(isRecording)
    };

    // 이 코드를 업로드 뿐만 아니라 아니라 음원 합치고, 그걸로 분석하게 해야함
    const MyrecordUpload = () => {
        setLoading(true)
        if (file) {
          const formData = new FormData();
          formData.append('file', file); 
          console.log(formData)
          console.log(file)
  
          axiosInstance({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/analyze/waveResult`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'accessToken': `Bearer ${localStorage.getItem("AccessToken")}`
            },
          })
            .then((res) => {
              console.log(res);
              setResponseData(res.data);
              setLoading(false)
              alert('완료!')
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
    setIsplay(false);
    setIsRecording(false); // 녹음 중지
    recorderControls.stopRecording()
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

    // const blob = new Blob([], {});
    // addAudio(blob)
    // getMergeMusic();
    
  }

  const handleCloseModal = () => {
    setAudioSourceURL(""); // audioSave 초기화
    setAudioSave(""); // audioSave 초기화
    dispatch(setAlbum(null));
    dispatch(setModal(null));
    // window.location.reload();
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%', // 반응형 크기 조절
    height: '100%', // 높이를 자동으로 조절
    // left: '30%', // 가운데 정렬을 위한 좌표 조절
    // top: '50%', // 가운데 정렬을 위한 좌표 조절
    // transform: 'translate(-50%, -50%)', // 가운데 정렬
    background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',
    borderRadius: '50px',
    border: 'none', // Optional: Remove button border
    color: '#fff', // Optional: Text color
    cursor: 'pointer',
  };  

  return (
      <Background $imageUrl="../../assets/background.png">
        <CloseButton onClick={handleCloseModal}>
          닫기
        </CloseButton>
        <ModalContainer open={isModalOpen}>
        {loading ? (
          // 로딩 중일 때 표시할 내용
          <div style={{ marginTop: '150px' }}>
            <h2>Loading...</h2>
            <img src="assets/spinner.gif" alt="" style={{ width: '50%'}} />
          </div>
        ) : responseData ? (
          <div>
                <div style={{marginTop: 150}}>
                    <h2>당신의 음색과</h2>
                    <h2>가장 잘 맞는 노래</h2>
                    {imgErr ? <img crossOrigin="anonymous"  onClick={handleAlbumClick} src='assets/default_album.png' alt="" style={{ width: '60%' }} />
                    :<img src={responseData.songImg} alt={responseData.title} onClick={handleAlbumClick} crossOrigin="anonymous" onError={()=>setImgErr(true)}/>}
                    <p>노래방 번호: {responseData.musicId}</p>
                    <p>Singer: {responseData.singer}</p>
                    <p>Title: {responseData.title}</p>
                    <button onClick={Home} style={{ width: '50%', margin: 'auto', borderRadius:'10px'}}>Go home</button>
                    </div>
                </div>
        

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
            onRecordingComplete={addAudio}
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
                    <div style={{ marginTop: 25}}>
                    {audioSourceURL && audioSave && (
                    // <MusicPlay audioSourceURL= {audioSave}/>
                    <AudioPlayer audioSourceURL= {audioSave}/>
                    )}
                    {audioSourceURL && !audioSave && (
                    // <MusicPlay audioSourceURL= {audioSourceURL}/>
                    <AudioPlayer audioSourceURL= {audioSourceURL}/>
                    )}
                    </div>
                    <div style={{ display: 'flex', flexDirection:'row',justifyContent: 'spacebetween', marginTop: 25 }}>
                    {isRecording && audioSourceURL && (
                    <button onClick={handleRestartRecording} style={buttonStyle}>다시 부르기</button>
                    )}
                    {isRecording && audioSourceURL && (
                    <button onClick={getMergeMusic} style={buttonStyle}>MR 합치기</button>
                    )}
                    {isRecording && audioSourceURL&&(
                    <button onClick={MyrecordUpload} style={buttonStyle}>
                        분석하기
                    </button>
                    )}
                    </div>
            </div>
            </>
            )}
        </ModalContainer>
      </Background>
  );
};

export default MusicSing;