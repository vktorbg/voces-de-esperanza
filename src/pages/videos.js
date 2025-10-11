// File: voces-de-esperanza/src/pages/videos.js

import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "react-i18next";

// --- Componente para una tarjeta de video individual ---
const VideoCard = ({ videoId, title }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="relative flex-shrink-0 w-72 sm:w-80 rounded-lg shadow-md overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white text-sm font-semibold truncate" title={title}>{title}</h3>
      </div>
    </a>
  );
};

// --- Componente para una fila de videos con desplazamiento horizontal ---
const VideoRow = ({ title, videos }) => {
  if (!videos || videos.length === 0) {
    return null; // No renderizar la fila si no hay videos
  }
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 px-4 sm:px-0">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 pl-4 sm:pl-0 -mb-4" style={{ scrollbarWidth: 'thin' }}>
        {videos.map((video, idx) => <VideoCard key={`${video.videoId}-${idx}`} videoId={video.videoId} title={video.title} />)}
        <div className="flex-shrink-0 w-1"></div> {/* Espaciador final */}
      </div>
    </div>
  );
};

// --- Componente principal de la página de videos ---
const VideosPage = ({ data }) => {
  const { t } = useTranslation();
  const youtubeIconUrl = "https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg";

  // Procesar y clasificar los videos obtenidos de Contentful
  const allVideos = data?.allContentfulVideo?.nodes || [];
  // Primero, filtra los recomendados y elimina duplicados por videoId
  const videosRecomendados = Array.from(
    new Map(
      allVideos.filter(v => v.isRecommended).map(v => [v.videoId, v])
    ).values()
  );
  // Luego, excluye los recomendados de las otras listas
  const recomendadosIds = new Set(videosRecomendados.map(v => v.videoId));
  const shorts = Array.from(
    new Map(
      allVideos.filter(v => v.videoType === 'Short' && !recomendadosIds.has(v.videoId)).map(v => [v.videoId, v])
    ).values()
  );
  const videosLargos = Array.from(
    new Map(
      allVideos.filter(v => v.videoType === 'Video Largo' && !recomendadosIds.has(v.videoId)).map(v => [v.videoId, v])
    ).values()
  );

  const hasVideos = allVideos.length > 0;

  return (
    // === AÑADIDO: contenedor con padding superior e inferior para safe-area ===
    <div className="pt-[env(safe-area-inset-top)] pb-12">
      <div className="font-sans w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-0 mb-4">
      {/* --- Banner Superior --- */}
      <div className="relative h-52 sm:h-64">
        <img src="/banner-videos.jpg" alt={t('videos_banner_alt', 'Banner de la sección de videos')} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-center text-center p-4">
          <img src={youtubeIconUrl} alt="YouTube" className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3"/>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-sm">{t('videos_title', 'Videoteca Cristiana')}</h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-md">{t('videos_subtitle', 'Explora nuestro contenido en video, desde reflexiones cortas hasta estudios profundos.')}</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {hasVideos ? (
          <>
            <VideoRow title={t('videos_shorts_title', 'Reflexiones en Corto')} videos={shorts} />
            <VideoRow title={t('videos_long_form_title', 'Estudios y Mensajes')} videos={videosLargos} />
            <VideoRow title={t('videos_recommended_title', 'Recomendados para ti')} videos={videosRecomendados} />
          </>
        ) : (
          <div className="text-center py-16 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{t('videos_no_videos', 'Aún no hay videos disponibles')}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t('videos_check_later', 'Vuelve a consultar más tarde.')}</p>
          </div>
        )}
        
        {/* --- Botón para visitar el canal --- */}
        <div className="text-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
          <a href="https://www.youtube.com/@vocesdesperanza025" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm sm:text-base">
            <img src={youtubeIconUrl} alt="" className="w-5 h-5 mr-2" />
            {t('videos_visit_channel', 'Visita Nuestro Canal en YouTube')}
          </a>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('videos_dont_miss', '¡No te pierdas nuestros últimos estrenos!')}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default VideosPage;

// --- Consulta GraphQL para obtener los videos de Contentful ---
export const query = graphql`
  query VideosPageQuery {
    allContentfulVideo(sort: { fields: publicationDate, order: DESC }) {
      nodes {
        title
        videoId
        videoType
        isRecommended
        publicationDate
      }
    }
  }
`;