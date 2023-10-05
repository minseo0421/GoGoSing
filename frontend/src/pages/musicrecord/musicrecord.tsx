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
              alert('완료!')
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

      const removeDecimal = (value: string) => {
        return value.replace(/\.0$/, ''); // .0로 끝나는 부분을 빈 문자열로 대체
      };

    return (
        <>
        {loading ? (
                // 로딩 중인 경우 로딩 화면을 표시
                <div style={{ marginTop: '150px' }}>
                    <h2>음성 분석 중입니다.</h2>
                    <h3>Loading...</h3>
                    <img src="assets/spinner.gif" alt="" style={{ width: '50%'}} />
                </div>
            ) : responseData ? (
                // 응답 데이터가 있는 경우 데이터를 표시
                <div>
                    <h1>음역대 분석 결과입니다.</h1>
                    <div style={{ display: 'flex', flexDirection:'row',justifyContent: 'space-evenly' }}>
                      <h3 style={{ padding: '0 0 0 50px' }}>높은 음: <span style={{ color: 'purple' }}>{removeDecimal(responseData.voiceRangeHighest)}</span></h3>
                      <h3 style={{ padding: '0 50px 0 0' }}>낮은 음: <span style={{ color: '#BB8DFF' }}>{removeDecimal(responseData.voiceRangeLowest)}</span></h3>
                    </div>
                    <p>사용자님에게 추천드리는 노래는</p>
                    {imgErr ? <img crossOrigin="anonymous"  onClick={handleAlbumClick} src='assets/default_album.png' alt="" style={{ width: '60%' }} />
                    :<img src={responseData.voiceRangeMatchingMusic.songImg || 'assets/default_album.png'} alt={responseData.voiceRangeMatchingMusic.title} onClick={handleAlbumClick} crossOrigin="anonymous" onError={()=>setImgErr(true)}/>}
                    <h2>{responseData.voiceRangeMatchingMusic.title}</h2>
                    <p>{responseData.voiceRangeMatchingMusic.singer}</p>
                    <p>노래방 번호 : {responseData.voiceRangeMatchingMusic.musicId}</p>
                    <p style={{ background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',borderRadius: '50px',border: 'none', color: '#fff', margin:'auto',height:'30px',display:'flex',justifyContent:'center',alignItems:'center',width:'35%'}} 
                      onClick={Home}>Go home</p>
                </div>
            ) : (
        <div style={{marginTop:'20%'}}>
            <div style={{ display: 'none' }}>
                    <AudioRecorder
                    onRecordingComplete={addAudio}
                    recorderControls={recorderControls}
                    // showVisualizer={true}
                    // downloadOnSavePress={true}
                    />
            </div>
            <h1>음역대 녹음</h1>
            <p>사용자님이 내실 수 있는 가장 낮은 음부터<br />가장 높은 음까지 녹음을 진행해주세요!</p>
            <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center', marginBottom: 24 }}>
                {!isRecording && audioSourceURL==="" && (
                  <div style={{ margin: 'auto', marginTop: '30%' }}>
                    <img src="assets/colmic.png" alt="" style={{width: '50%', height:'50%'}} onClick={handleStartRecording}/>
                    <p>마이크 아이콘 터치 시, 녹음이 시작됩니다.</p>
                </div>
                )}
                {isRecording && audioSourceURL==="" && (
                <div style={{ margin: 'auto', marginTop: '40%' }}>
                  <h1>녹음 진행중</h1>
                  <h1>{recorderControls.recordingTime}</h1>

                  <p style={{ background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',borderRadius: '50px',border: 'none', color: '#fff', margin:'20px',height:'30px',display:'flex',justifyContent:'center',alignItems:'center'}} 
                  onClick={recorderControls.stopRecording}>녹음 끝내기</p>
                </div>
                )}
                {audioSourceURL && (
                    // <MusicPlay audioSourceURL= {audioSourceURL}/>
                    // <AudioPlayer audioSourceURL= {audioSourceURL}/>
                    <div>
                      <AudioWithWave audioSourceURL= {audioSourceURL}/>
                      <p style={{marginTop:'40px'}}>녹음 파일을 확인하고 분석을 진행해주세요</p>
                    </div>
                    )}
                    <div style={{ display: 'flex', flexDirection:'row',justifyContent: 'center', marginTop: 20 }} >
                    {isRecording && audioSourceURL && (
                      <p style={{ background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',borderRadius: '50px',border: 'none', color: '#fff', height:'30px',width:'120px',display:'flex',justifyContent:'center',alignItems:'center',margin:'5px'}} 
                      onClick={handleRestartRecording}>다시하기</p>
                    // <button onClick={handleRestartRecording} style={buttonStyle}>다시하기</button>
                    )}
                    {isRecording && audioSourceURL&&(
                    <p style={{ background: 'linear-gradient(90deg, #BB8DFF 0.69%, #8F76FE 100.35%)',borderRadius: '50px',border: 'none', color: '#fff',height:'30px',width:'120px',display:'flex',justifyContent:'center',alignItems:'center',margin:'5px'}} 
                      onClick={MyrecordUpload}>분석 진행하기</p>
                    )}
                    </div>
            </div>
        </div>
        )}
        </>

      );
}
export default MusicRecord;