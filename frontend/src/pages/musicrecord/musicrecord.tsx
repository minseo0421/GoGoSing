import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import MusicPlay from '../../components/musicrecord/musicplay';

const MusicRecord: React.FC = () => {

    const recorderControls = useAudioRecorder();
    const [isRecording, setIsRecording] = useState(false);
    const [audioSourceURL, setAudioSourceURL] = React.useState("");

    const handleStartRecording = () => {
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
        const url = URL.createObjectURL(blob);
        setAudioSourceURL(url);
        console.log(url)
    };

    const handleRestartRecording = () => {
      setAudioSourceURL("");
      setIsRecording(!isRecording);
      console.log(audioSourceURL)
      console.log(isRecording)
    };

    const navigate = useNavigate();

    const recordresult = () => {
        navigate("/recordresult");
    };

    return (
        <>
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
                    <p>{recorderControls.recordingTime}</p>
                    <p onClick={recorderControls.stopRecording}>녹음 멈춰!!</p>
                </div>
                )}
                {audioSourceURL && (
                    <MusicPlay audioSourceURL= {audioSourceURL}/>
                    )}
                    {isRecording && audioSourceURL && (
                    <button onClick={handleRestartRecording} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>다시하기</button>
                    )}
                    {isRecording && audioSourceURL&&(
                    <button onClick={recordresult} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>
                        다음으로
                    </button>
                    )}
            </div>
        </div>
        </>

      );
}
export default MusicRecord;