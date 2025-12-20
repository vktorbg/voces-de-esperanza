/**
 * Utilidades para filtrar videos por idioma
 * @module utils/videoFilters
 */

/**
 * Filtra videos por idioma según el idioma actual del sitio
 *
 * @param {Array} videos - Array de videos de Contentful
 * @param {string} language - Idioma actual ('es' o 'en')
 * @returns {Array} Videos filtrados que deben mostrarse en el idioma actual
 *
 * @example
 * const filteredVideos = filterVideosByLanguage(allVideos, 'es');
 * // Retorna solo videos con idioma='es', idioma='ambos', o sin idioma definido
 */
export const filterVideosByLanguage = (videos, language) => {
  if (!videos || !Array.isArray(videos)) {
    return [];
  }

  return videos.filter(video => {
    const videoLang = video.idioma;

    // Mostrar el video si:
    // 1. No tiene idioma definido (null/undefined) - backward compatibility
    // 2. idioma === 'ambos' - se muestra en ambos sitios
    // 3. idioma coincide con el idioma actual del sitio
    return !videoLang || videoLang === 'ambos' || videoLang === language;
  });
};
