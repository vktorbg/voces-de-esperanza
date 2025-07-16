// File: voces-de-esperanza/src/pages/videos.js

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const PlayCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);

const VideosView = ({ videos }) => {
  const { t } = useTranslation();
  const youtubeIconUrl = "https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg";
  const [firstVideo, ...restVideos] = videos;

  if (!firstVideo) {
    return (
      <div className="text-center p-8 flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{t('videos_no_videos')}</h2>
        <p className="text-gray-500 dark:text-gray-400">{t('videos_check_later')}</p>
      </div>
    );
  }

  return (
    <div className="font-sans w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden px-2" style={{ maxWidth: '95vw' }}>
      <div className="relative h-48 sm:h-64">
        <img src="/banner-videos.jpg" alt={t('videos_banner_alt')} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-center text-center p-4">
          <img src={youtubeIconUrl} alt="YouTube" className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3"/>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-sm">{t('videos_title')}</h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-md">{t('videos_subtitle')}</p>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-8 mb-8 items-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col items-center w-[320px] max-w-full mx-auto">
            <div className="relative w-[320px] h-[570px] max-w-full mx-auto">
              <iframe className="absolute top-0 left-0 w-full h-full rounded-t-lg sm:rounded-lg" src={`https://www.youtube.com/embed/${firstVideo.id}?playlist=${firstVideo.id}&loop=1&autoplay=0&mute=0`} title={firstVideo.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
          <div className="text-center py-4">
            <a href="https://www.youtube.com/@vocesdesperanza025" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm sm:text-base">
              <img src={youtubeIconUrl} alt="" className="w-5 h-5 mr-2" />
              {t('videos_visit_channel')}
            </a>
            <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('videos_dont_miss')}</p>
          </div>
          {restVideos.map((video) => (
            <div key={video.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col items-center w-[320px] max-w-full mx-auto">
              <div className="relative w-[320px] h-[570px] max-w-full mx-auto">
                <iframe className="absolute top-0 left-0 w-full h-full rounded-t-lg sm:rounded-lg" src={`https://www.youtube.com/embed/${video.id}?playlist=${video.id}&loop=1&autoplay=0&mute=0`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// VideosPage: Componente principal de la página, ahora es dinámico.
const VideosPage = () => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/get-videos');
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        }
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center flex-grow text-center p-8 max-w-2xl mx-auto">
          <PlayCircleIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{t('videos_loading')}</h2>
        </div>
      );
    }
    return <VideosView videos={videos} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        {renderContent()}
      </main>
    </div>
  );
};

export default VideosPage;