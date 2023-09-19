import React, { useState, useRef } from 'react';
// import MusicPlay from '../components/musicrecord/musicplay';
import { useNavigate } from "react-router-dom";

const MusicUpload: React.FC = () => {

    const [file, setFile] = useState<File | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const source = useRef<MediaElementAudioSourceNode | null>(null);
    const analyzer = useRef<AnalyserNode | null>(null);

    const navigate = useNavigate();
    const Home = () => {
        navigate("/");
    };

    const handleAudioPlay = () => {
        let audioContext = new AudioContext();
        if (!source.current || !analyzer.current) {
          source.current = audioContext.createMediaElementSource(
            audioRef.current as HTMLMediaElement
          );
          analyzer.current = audioContext.createAnalyser();
          source.current.connect(analyzer.current);
          analyzer.current.connect(audioContext.destination);
        }
      };
    
    return (
        <>
        <p onClick={ Home }>X</p>
        <h1>자신이 부른 노래를</h1>
        <h1>업로드해 주세요!</h1>
        <br />
        <p>업로드 해주신 노래를 기반으로</p>
        <p>주토끼님의 목소리와</p>
        <p>유사한 노래를 추천합니다.</p>
          <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ margin: 'auto', marginBottom: '10px' }}>
            {file===null && (
                <input
                type="file"
                accept='audio/*'
                onChange={({ target: { files } }) => files && files[0] && setFile(files[0])}
                 />
            )}
            {file && (
                <audio
                ref={audioRef}
                onPlay={handleAudioPlay}
                src={window.URL.createObjectURL(file)}
                controls
                />
            )}
            </div>
          </div>
        </>
      );
}
export default MusicUpload;