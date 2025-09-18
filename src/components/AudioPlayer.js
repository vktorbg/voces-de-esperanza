// src/components/AudioPlayer.js
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

// --- Iconos para el reproductor (sin cambios) ---
const PlayIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.279 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>;
const PauseIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm9 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>;
const BackwardIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>;
const XMarkIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>;

const AudioContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [track?.url]);

  const playTrack = (newTrack) => {
    if (audioRef.current && track?.url !== newTrack.url) {
      audioRef.current.pause();
    }
    setTrack(newTrack);
    const audio = new Audio(newTrack.url);
    audioRef.current = audio;
    audio.play().then(() => setIsPlaying(true)).catch(console.error);
  };
  
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(time);
      setCurrentTime(Number(time));
    }
  };
  
  const rewind = (seconds = 10) => {
      seek(Math.max(0, currentTime - seconds));
  };
  
  const closePlayer = () => {
      if (audioRef.current) audioRef.current.pause();
      setTrack(null);
      setIsPlaying(false);
  };

  const value = { track, isPlaying, duration, currentTime, playTrack, togglePlayPause, seek, rewind, closePlayer };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioContext);

// UI del reproductor. Ahora es un componente más simple.
export const PlayerUI = () => {
  const { track, isPlaying, duration, currentTime, togglePlayPause, seek, closePlayer } = useAudioPlayer();
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsNativeApp(Capacitor.isNativePlatform());
    }
  }, []);

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Posicionamiento adaptativo según la plataforma - enfoque más conservador
  const bottomPosition = isNativeApp 
    ? 'bottom-[89px] sm:bottom-[97px]' // 57px + 32px safe area, 65px + 32px safe area
    : 'bottom-[57px] sm:bottom-[65px]';

  return (
    <div className={`fixed ${bottomPosition} left-0 right-0 z-40 px-2 sm:px-4 transition-all duration-300 ease-out ${track ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl ring-1 ring-black/5 flex items-center gap-3 p-3">
          <img src={track?.image || "/icon.jpg"} alt="Track" className="w-12 h-12 rounded-md flex-shrink-0 object-cover" />
          <div className="flex-grow flex flex-col gap-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{track?.title || 'Selecciona un audio'}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-9 text-center">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => seek(e.target.value)}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
              />
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-9 text-center">{formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={togglePlayPause} className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-transform active:scale-90">
              {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 pl-0.5" />}
            </button>
            <button onClick={closePlayer} className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
    </div>
  );
};