import React, { useRef } from 'react';

let animationController;

interface MusicPlayProps {
    audioSourceURL: string;
  }


const MusicPlay: React.FC<MusicPlayProps> = ({ audioSourceURL }) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);
  const analyzer = useRef<AnalyserNode | null>(null);

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
    visualizeData();
  };

  const visualizeData = () => {
    animationController = window.requestAnimationFrame(visualizeData);
    if (audioRef.current && audioRef.current.paused) {
      return window.cancelAnimationFrame(animationController);
    }
    const songData = new Uint8Array(140);
    if (analyzer.current) {
      analyzer.current.getByteFrequencyData(songData);
    }
    const bar_width = 3;
    let start = 0;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < songData.length; i++) {
        // compute x coordinate where we would draw
        start = i * 4;
        // create a gradient for the whole canvas
        let gradient = ctx.createLinearGradient(
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
        gradient.addColorStop(0.2, "#2392f5");
        gradient.addColorStop(0.5, "#fe0095");
        gradient.addColorStop(1.0, "purple");
        ctx.fillStyle = gradient;
        ctx.fillRect(start, ctx.canvas.height, bar_width, -songData[i]);
      }
    }
  };
    
    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* <div style={{ width: '100%', height: '50vh' }}> */}
            {audioSourceURL && (
            <canvas ref={canvasRef} height={260}></canvas>
            )}
            {audioSourceURL && (
                <audio
                ref={audioRef}
                onPlay={handleAudioPlay}
                src={audioSourceURL}
                crossOrigin="anonymous"
                controls
                />
            )}
            {/* </div> */}
            
        </div>
      );
}
export default MusicPlay;