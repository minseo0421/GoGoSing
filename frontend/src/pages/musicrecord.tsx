import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const MusicRecord: React.FC = () => {

    
    const recorderControls = useAudioRecorder();
    const [isRecording, setIsRecording] = useState(false);
    const [audioSourceURL, setAudioSourceURL] = React.useState("");
      
    const onRecordingComplete = (blob: Blob) => {
        setIsRecording(true);
        const url = URL.createObjectURL(blob);
      
        console.log(blob);
      
        setAudioSourceURL(url);
    };

    return (
        <>
        <h1> 음성 녹음 페이지</h1>
        <p>당신의 음역대를 입력하십시오</p>
          <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ margin: 'auto', marginBottom: '10px' }}>
                <AudioRecorder
                onRecordingComplete={onRecordingComplete}
                recorderControls={recorderControls}
                />
            </div>
          </div>
    
          {isRecording && (
            <audio
                controls
                src={audioSourceURL}
                // type="audio/mpeg"
                preload="metadata"
            />
           )}
           {isRecording && (
            <button onClick={() => {
                    recorderControls.startRecording();
                    setIsRecording(false); // 녹음을 다시 시작하면 isRecording을 false로 설정
                }} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>
                    다시하기
            </button>
            )}
            {isRecording && (
            <button onClick={recorderControls.stopRecording} style={{ width: '30%', margin: 'auto', borderRadius:'10px'}}>
                다음으로
            </button>
            )}
           
        </>
      );
}
export default MusicRecord;