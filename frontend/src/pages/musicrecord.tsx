import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import MusicPlay from '../components/musicrecord/musicplay';

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

    const onRecordingComplete = (blob: Blob) => {
        setIsRecording(true);
        const url = URL.createObjectURL(blob);
        // console.log(blob);
        setAudioSourceURL(url);
    };

    const handleRestartRecording = () => {
        setAudioSourceURL("");
        setIsRecording(!isRecording);
        console.log(audioSourceURL)
        console.log(isRecording)
    };

    return (
        <>
        <h1>당신의 음역대</h1>
        <h1>입력해!</h1>
          <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ margin: 'auto', marginBottom: '10px' }}>
            {audioSourceURL==="" && !isRecording &&(
                <button onClick={handleStartRecording} style={{ width: '100px', height: '40px', borderRadius: '10px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }}>
                녹음 시작
                </button>
            )}
            {/* {isRecording &&( */}
            {isRecording && (
                    <AudioRecorder
                        onRecordingComplete={onRecordingComplete}
                        recorderControls={recorderControls}
                    />
                )}
            </div>
          </div>
          <div>
            {isRecording && audioSourceURL&& (
            <MusicPlay audioSourceURL= {audioSourceURL}/>
             )} 
            <div>
            {isRecording && audioSourceURL&& (
                <button onClick={
                    handleRestartRecording
                    } style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>
                        다시하기
                </button>
                )}
            {isRecording && audioSourceURL&&(
                <button onClick={recorderControls.stopRecording} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>
                    다음으로
                </button>
                )}
            </div>
            
           </div>
        </>
      );
}
export default MusicRecord;