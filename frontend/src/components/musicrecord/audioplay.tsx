import React, { useState, useRef, useEffect } from 'react';
import styles from './AudioPlayer.module.css';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';

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
  }, []);

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

  return (
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
  );
};
export { AudioPlayer };