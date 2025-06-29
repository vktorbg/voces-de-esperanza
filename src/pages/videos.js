// File: voces-de-esperanza/src/pages/videos.js

import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

// --- Icon Components (Heroicons - outline style) ---
const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const PlayCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);
const UsersIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const DocumentTextIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
// --- End Icon Components ---

const VideosView = ({ videos }) => {
  const youtubeIconUrl = "https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg";
  const [firstVideo, ...restVideos] = videos;

  if (!firstVideo) {
    return (
      <div className="text-center p-8 flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No hay videos disponibles</h2>
        <p className="text-gray-500 dark:text-gray-400">Por favor, revisa más tarde.</p>
      </div>
    );
  }

  return (
    <div className="font-sans w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden px-2" style={{ maxWidth: '95vw' }}>
      <div className="relative h-48 sm:h-64">
        <img src="/banner-videos.jpg" alt="Video banner background" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-center text-center p-4">
          <img src={youtubeIconUrl} alt="YouTube" className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3"/>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-sm">Nuestros Videos</h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-md">Contenido inspirador en videos cortos. ¡Esperanza y sabiduría para tu día!</p>
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
              Visita y Sigue Nuestro Canal
            </a>
            <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">¡No te pierdas nuestros últimos videos!</p>
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

  const navItems = [
    { name: "Devocionales", path: "/", icon: BookOpenIcon },
    { name: "Videos", path: "/videos/", icon: PlayCircleIcon },
    { name: "Quiénes somos", path: "/quienes-somos/", icon: UsersIcon },
    { name: "Recursos", path: "/recursos/", icon: DocumentTextIcon },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center flex-grow text-center p-8 max-w-2xl mx-auto">
          <PlayCircleIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Cargando videos...</h2>
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

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-top-lg z-50">
        <div className="flex justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon; 
            return (
              <Link key={item.name} to={item.path} className="flex flex-col items-center justify-center flex-1 py-2.5 sm:py-3 px-1 text-center focus:outline-none transition-all duration-200 ease-in-out group text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300" activeClassName="!text-blue-600 dark:!text-blue-400 scale-105" partiallyActive={item.path !== "/"}>
                <Icon className={`w-6 h-6 mb-0.5 transition-transform duration-200 ease-in-out group-hover:scale-110`} /> 
                <span className={`text-xs font-medium transition-opacity duration-200 ease-in-out opacity-90 group-hover:opacity-100`}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default VideosPage;