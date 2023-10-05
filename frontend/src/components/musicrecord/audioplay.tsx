// 파형 표시해보려는 코드 근데 안나옴
import React, { useState, useRef, useEffect } from 'react';
import styles from './AudioPlayer.module.css';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';

let animationController;

interface AudioPlayProps {
  audioSourceURL: string;
}

const AudioPlayer: React.FC<AudioPlayProps> = ({ audioSourceURL }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);

  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const progressBar = useRef<HTMLInputElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);
  const analyzer = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.src = audioSourceURL;
      audioPlayer.current.load();
    }
  }, [audioSourceURL]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.addEventListener('loadedmetadata', () => {
        const seconds = Math.floor(audioPlayer.current!.duration);
        setDuration(seconds);
        if (progressBar.current) {
          progressBar.current.max = seconds.toString();
        }
      });
    }
  }, [audioSourceURL]);

  useEffect(() => {
    if (audioPlayer.current) {
      // 여기에서 오디오 파일의 총 시간을 가져오는 코드를 적용합니다.
      const url = audioSourceURL;
      if (progressBar.current) {
        getDuration(url, progressBar.current, (audioDuration: number) => {
          setDuration(audioDuration);
        });
      }
    }
  }, [audioSourceURL]);



  const calculateTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      if (audioPlayer.current) {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
    } else {
      if (audioPlayer.current) {
        audioPlayer.current.pause();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    }
  };

  const changeRange = () => {
    if (audioPlayer.current && progressBar.current) {
      const newValue = parseFloat(progressBar.current.value);
      audioPlayer.current.currentTime = newValue;
      changePlayerCurrentTime();
    }
  };

  const whilePlaying = () => {
    if (audioPlayer.current && progressBar.current) {
        let a = audioPlayer.current.currentTime.toString()
      progressBar.current.value = a;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
    let audioContext = new AudioContext();
    if (!source.current || !analyzer.current) {
        source.current = audioContext.createMediaElementSource(
        audioPlayer.current as HTMLMediaElement
        );
        analyzer.current = audioContext.createAnalyser();
        source.current.connect(analyzer.current);
        analyzer.current.connect(audioContext.destination);
      }
      visualizeData();
  };

  const changePlayerCurrentTime = () => {
    if (progressBar.current && duration !== undefined) {
      progressBar.current.style.setProperty(
        '--seek-before-width',
        `${(parseFloat(progressBar.current.value) / duration) * 100}%`
      );
      setCurrentTime(parseFloat(progressBar.current.value));
    }
  };

  const visualizeData = () => {
    animationController = window.requestAnimationFrame(visualizeData);
    if (audioPlayer.current && audioPlayer.current.paused) {
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
    <>
      {audioSourceURL && (
            <canvas ref={canvasRef} height={260}></canvas>
            )}
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} preload="metadata"></audio>

      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <FaPause className={styles.pause}/> : <FaPlay className={styles.play} />}
      </button>

      <div className={styles.currentTime}>{currentTime !== undefined && calculateTime(currentTime)}</div>

      <div>
        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>

      <div className={styles.duration}>{duration !== undefined && !isNaN(duration) && calculateTime(duration)}</div>
    </div>
    </>
  );
};
export { AudioPlayer };

// getDuration 함수 정의
const getDuration = function (url: string, progressBar: HTMLInputElement ,next: (duration: number) => void) {
    const _player = new Audio(url);
    _player.addEventListener("durationchange", function (e) {
      if (this.duration !== Infinity) {
        const duration = Math.floor(this.duration);
        if (progressBar) {
          progressBar.max = duration.toString();
        }
        _player.remove();
        next(duration);
      }
    }, false);
    _player.load();
    _player.currentTime = 24 * 60 * 60; // 가상 큰 시간
    _player.volume = 0;
    _player.play();
  };