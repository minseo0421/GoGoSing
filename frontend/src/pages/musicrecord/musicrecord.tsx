import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
// import MusicPlay from '../../components/musicrecord/musicplay';
// import { AudioPlayer } from '../../components/musicrecord/audioplay';
import axiosInstance from '../../axiosinstance';
import { setModal, setAlbum } from "../../store/actions";
import { useDispatch } from "react-redux";
import { AudioWithWave } from '../../components/musicrecord/audiowithwave';


const MusicRecord: React.FC = () => {
    const recorderControls = useAudioRecorder();
    const [isRecording, setIsRecording] = useState(false);
    const [audioSourceURL, setAudioSourceURL] = React.useState("");
    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<any | null>(null);
    const [imgErr, setImgErr] = useState<boolean>(false)
    
    const dispatch = useDispatch();
    const handleAlbumClick = () => {
        dispatch(setModal("musicDetail"));
        dispatch(setAlbum(responseData.voiceRangeMatchingMusic.musicId)) // 모달 표시 액션
      };

    const handleStartRecording = () => {
        const Token = localStorage.getItem('AccessToken');
            if (!Token) {
            alert('회원이 아닙니다.')
            console.log('회원이 아닙니다.')
            
            return navigate('/login');
            }
        // 미디어 액세스 권한 확인 및 요청
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                // 권한 승인됨, 녹음 시작
                setIsRecording(!isRecording);
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

    const addAudio = (blob: Blob) => {
        setIsRecording(true);
        // setIsRecording(false);
        const url = URL.createObjectURL(blob);
        setAudioSourceURL(url);
        // audioFile에 audio.webm을 할당
        const audioFile = new File([blob], 'audio.webm', { type: 'audio/webm' });
        // file을 audioFile로 변경 
        setFile(audioFile);
        console.log(audioSourceURL)

        console.log(url)
        console.log(audioFile);
    };

    const handleRestartRecording = () => {
      setAudioSourceURL("");
      setIsRecording(!isRecording);
      console.log(audioSourceURL)
      console.log(isRecording)
    };

    const navigate = useNavigate();
    const Home = () => {
        navigate("/");
    };

    const MyrecordUpload = () => {
        setLoading(true);
        if (file) {
          const formData = new FormData();
          formData.append('file', file); 
          console.log(formData)
          console.log(file)
  
          axiosInstance({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/analyze/rangeResult`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
            },
          })
            .then((res) => {
              console.log(res);
              setResponseData(res.data);
                setLoading(false)
              alert('업로드 완료!')
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        } else {
          console.log('error발생.');
          setLoading(false);
        }
      };

      const buttonStyle: React.CSSProperties = {
        width: '40%', // 반응형 크기 조절
        height: '60%', // 높이를 자동으로 조절
        // left: '30%', // 가운데 정렬을 위한 좌표 조절
        // top: '50%', // 가운데 정렬을 위한 좌표 조절
        // transform: 'translate(-50%, -50%)', // 가운데 정렬
        background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',
        borderRadius: '50px',
        border: 'none', // Optional: Remove button border
        color: '#fff', // Optional: Text color
        cursor: 'pointer',
      };  

    // const recordresult = () => {
        // navigate("/recordresult");
    // };

    return (
        <>
        {loading ? (
                // 로딩 중인 경우 로딩 화면을 표시
                <div style={{ marginTop: '150px' }}>
                    <p>Loading...</p>
                    <img src="assets/spinner.gif" alt="" style={{ width: '50%'}} />
                </div>
            ) : responseData ? (
                // 응답 데이터가 있는 경우 데이터를 표시
                <div>
                    <h1>음역대 분석 결과입니다.</h1>
                    <p>높은 음: {responseData.voiceRangeHighest}</p>
                    <p>낮은 음: {responseData.voiceRangeLowest}</p>
                    <p>당신이 편하게 부를 수 있는 노래는</p>
                    {imgErr ? <img crossOrigin="anonymous"  onClick={handleAlbumClick} src='assets/default_album.png' alt="" style={{ width: '60%' }} />
                    :<img src={responseData.voiceRangeMatchingMusic.songImg || 'assets/default_album.png'} alt={responseData.voiceRangeMatchingMusic.title} onClick={handleAlbumClick} crossOrigin="anonymous" onError={()=>setImgErr(true)}/>}
                    <p>노래방 번호 : {responseData.voiceRangeMatchingMusic.musicId}</p>
                    <p>가수 : {responseData.voiceRangeMatchingMusic.singer}</p>
                    <p>노래 제목: {responseData.voiceRangeMatchingMusic.title}</p>
                    <button onClick={Home} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>Go home</button>
                </div>
            ) : (
        <div>
            <div style={{ display: 'none' }}>
                    <AudioRecorder
                    onRecordingComplete={addAudio}
                    recorderControls={recorderControls}
                    // showVisualizer={true}
                    // downloadOnSavePress={true}
                    />
            </div>
            <h1>당신의 음역대</h1>
            <h1>입력해!</h1>
            <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center', marginBottom: 24 }}>
                {!isRecording && audioSourceURL==="" && (
                <div style={{ margin: 'auto', marginBottom: '10px' }}>
                    <img src="assets/colmic.png" alt="" style={{width: '50%', height:'50%'}} onClick={handleStartRecording}/>
                </div>
                )}
                {isRecording && audioSourceURL==="" && (
                <div>
                    <h1>{recorderControls.recordingTime}</h1>
                    <p onClick={recorderControls.stopRecording}>녹음 멈춰!!</p>
                </div>
                )}
                {audioSourceURL && (
                    // <MusicPlay audioSourceURL= {audioSourceURL}/>
                    // <AudioPlayer audioSourceURL= {audioSourceURL}/>
                    <AudioWithWave audioSourceURL= {audioSourceURL}/>
                    )}
                    <div style={{ display: 'flex', flexDirection:'row',justifyContent: 'center', marginTop: 40 }} >
                    {isRecording && audioSourceURL && (
                    <button onClick={handleRestartRecording} style={buttonStyle}>다시하기</button>
                    )}
                    {isRecording && audioSourceURL&&(
                    // <button onClick={recordresult} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>
                    //     다음으로
                    // </button>
                    <button onClick={MyrecordUpload} style={buttonStyle}>
                    다음으로
                    </button>
                    )}
                    </div>
            </div>
        </div>
        )}
        </>

      );
}
export default MusicRecord;