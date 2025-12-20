// File: voces-de-esperanza/src/pages/llamado-accion.js

import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../components/LanguageProvider";
import { filterVideosByLanguage } from "../utils/videoFilters";

// --- Componente para una tarjeta de video individual ---
const ActionVideoCard = ({ videoId, title, publicationDate }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  // Format date for display (Semana del [date])
  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-102 bg-white dark:bg-gray-800"
    >
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {/* Hover overlay with play icon */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-16 h-16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          </svg>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
          {title}
        </h3>
        {formattedDate && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Semana del {formattedDate}
          </p>
        )}
      </div>
    </a>
  );
};

// --- Componente principal de la página ---
const LlamadoAccionPage = ({ data }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const allVideos = data?.allContentfulVideo?.nodes || [];

  // Filtrar videos por idioma
  const callToActionVideos = filterVideosByLanguage(allVideos, language);

  const youtubeIconUrl = "https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg";

  return (
    <div className="pt-[env(safe-area-inset-top)] pb-12">
      <div className="font-sans w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-0 mb-4">

        {/* --- Banner Superior --- */}
        <div className="relative h-52 sm:h-64">
          <img
            src="/banner-llamado-accion.jpg"
            alt={t('call_to_action_banner_alt', 'Banner de Llamado a la Acción')}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-center text-center p-4">
            <div className="text-5xl mb-3">🔥</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 shadow-sm">
              {t('call_to_action_title', 'Llamado a la Acción')}
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-md">
              {t('call_to_action_subtitle', 'Videos semanales que conectan la Palabra con acciones concretas.')}
            </p>
          </div>
        </div>

        {/* --- Contenido Principal --- */}
        <div className="p-4 sm:p-6 lg:p-8">
          {callToActionVideos.length > 0 ? (
            <>
              {/* Intro text */}
              <div className="mb-8 text-center">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {t('call_to_action_intro', 'Cada sábado, reflexiona sobre cómo aplicar las enseñanzas en acciones prácticas.')}
                </p>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {callToActionVideos.map((video) => (
                  <ActionVideoCard
                    key={video.videoId}
                    videoId={video.videoId}
                    title={video.title}
                    publicationDate={video.publicationDate}
                  />
                ))}
              </div>
            </>
          ) : (
            // Empty State
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📹</div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('call_to_action_no_videos', 'Próximamente videos de Llamado a la Acción')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t('call_to_action_check_back', 'Vuelve cada sábado para nuevos videos.')}
              </p>
            </div>
          )}

          {/* --- Botón para visitar el canal --- */}
          <div className="text-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
            <a
              href="https://www.youtube.com/@vocesdesperanza025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm sm:text-base"
            >
              <img src={youtubeIconUrl} alt="" className="w-5 h-5 mr-2" />
              {t('call_to_action_visit_channel', 'Visita Nuestro Canal en YouTube')}
            </a>
            <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {t('videos_dont_miss', '¡No te pierdas nuestros últimos estrenos!')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LlamadoAccionPage;

// --- Consulta GraphQL para obtener los videos de "Llamado a la Acción" ---
export const query = graphql`
  query CallToActionVideosQuery {
    allContentfulVideo(
      filter: { videoType: { eq: "Llamado a la acción" } }
      sort: { fields: publicationDate, order: DESC }
    ) {
      nodes {
        title
        videoId
        videoType
        publicationDate
        idioma
      }
    }
  }
`;
