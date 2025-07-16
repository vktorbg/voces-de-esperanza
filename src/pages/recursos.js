// File: voces-de-esperanza/src/pages/recursos.js

import React from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";

// --- Icon Components ---
const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const DocumentTextIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const ArrowDownTrayIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);
const EyeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
// --- Fin Icon Components ---

const RecursosView = () => {
  const { t } = useTranslation();
  
  const compartirEnlace = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert(t('resources_link_copied') + url);
      })
      .catch((err) => {
        console.error("Error al copiar el enlace: ", err);
      });
  };

  const estudianteUrl = "/pdfs/Manual-del-Estudiante.pdf";
  const maestroUrl = "/pdfs/Manual-del-Maestro.pdf";
  const libertadEmocionalUrl = "/pdfs/Estudio-Libertad-Emocional.pdf";

  // Nuevo: rutas de previews e "leer" para libertad emocional
  const previewEstudiante = "/pdfs/preview-estudiante.png";
  const previewMaestro = "/pdfs/preview-maestro.png";
  const previewLibertad = "/pdfs/preview-libertad.png";
  const leerLibertad = "/recursos/estudio-libertad-emocional-react-pdf/";

  // Nuevo: ruta para leer el PDF de consejería matrimonial
  const clavesConsejeriaUrl = "/pdfs/Claves-Consejeria-Matrimonial.pdf";
  const previewClavesConsejeria = "/pdfs/preview-consejeria.png"; // Usa una imagen de preview si tienes, si no puedes dejar un placeholder
  const leerClavesConsejeria = "/recursos/claves-consejeria-matrimonial-react-pdf/";

  // Dropdown para acciones
  const DocDropdown = ({ leerTo, descargarHref, compartirHref, compartirLabel }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="relative w-full">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded shadow flex items-center justify-center gap-2 transition"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          {/* Cambia el "+" por el ícono de libro */}
          <BookOpenIcon className="w-4 h-4" />
          {t('resources_options')}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute left-0 right-0 mt-2 z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg flex flex-col py-1 animate-fade-in">
            {leerTo && (
              <Link
                to={leerTo}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-green-700 dark:text-green-300 text-sm font-medium transition"
                onClick={() => setOpen(false)}
              >
                <EyeIcon className="w-4 h-4" />
                {t('resources_read')}
              </Link>
            )}
            <a
              href={descargarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium transition"
              onClick={() => setOpen(false)}
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              {t('resources_download')}
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                if (navigator.share) {
                  navigator.share({
                    title: `${t('resources_share')} ${compartirLabel}`,
                    url: compartirHref,
                  })
                    .then(() => console.log(`${t('resources_shared_success')} ${compartirLabel}`))
                    .catch((error) => console.error("Error al compartir:", error));
                } else {
                  compartirEnlace(compartirHref);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-700 dark:text-blue-300 text-sm font-medium transition w-full text-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12l-3-3m0 0l3-3m-3 3h9" />
              </svg>
              {t('resources_share')}
            </button>
          </div>
        )}
      </div>
    );
  };

  // Card component para cada documento
  const DocCard = ({ title, previewImg, leerTo, descargarHref, compartirHref, compartirLabel }) => (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 flex flex-col items-center gap-3 transition hover:shadow-lg w-full">
      <img
        src={previewImg}
        alt={`${t('resources_preview')} ${title}`}
        className="w-full max-w-xs rounded mb-2 shadow object-cover"
        style={{ aspectRatio: "16/9", background: "#2223" }}
      />
      <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200 text-center mb-1">{title}</h4>
      <DocDropdown
        leerTo={leerTo}
        descargarHref={descargarHref}
        compartirHref={compartirHref}
        compartirLabel={compartirLabel}
      />
    </div>
  );

  return (
    <div className="font-sans w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
         style={{ maxWidth: '95vw' }}>
      {/* Banner superior */}
      <div className="relative h-48 sm:h-60 md:h-64">
        <img
          src="/banner-recursos.jpg"
          alt={t('resources_banner_alt')}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-center text-center p-4">
          <DocumentTextIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white mb-2 sm:mb-3 opacity-90 drop-shadow-lg" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-md">{t('resources_title')}</h2>
          <p className="text-sm sm:text-base text-gray-100 max-w-lg drop-shadow">
            {t('resources_subtitle')}
          </p>
        </div>
      </div>

      {/* Secciones de Contenido */}
      <div className="p-6 sm:p-8 space-y-10 md:space-y-12">

        {/* 1. Liderazgo */}
        <section className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center flex items-center justify-center gap-2">
            <BookOpenIcon className="w-7 h-7 text-green-600 dark:text-green-300" />
            {t('resources_leadership')}
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <DocCard
              title={t('resources_student_manual')}
              previewImg={previewEstudiante}
              leerTo="/recursos/manual-del-estudiante-react-pdf/"
              descargarHref={estudianteUrl}
              compartirHref={estudianteUrl}
              compartirLabel={t('resources_student_manual')}
            />
            <DocCard
              title={t('resources_teacher_manual')}
              previewImg={previewMaestro}
              leerTo="/recursos/manual-del-maestro-react-pdf/"
              descargarHref={maestroUrl}
              compartirHref={maestroUrl}
              compartirLabel={t('resources_teacher_manual')}
            />
          </div>
        </section>

        {/* 2. Discipulado */}
        <section className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center flex items-center justify-center gap-2">
            <BookOpenIcon className="w-7 h-7 text-green-600 dark:text-green-300" />
            {t('resources_discipleship')}
          </h3>
          <div className="grid gap-6 max-w-md mx-auto">
            <DocCard
              title={t('resources_emotional_freedom')}
              previewImg={previewLibertad}
              leerTo={leerLibertad}
              descargarHref={libertadEmocionalUrl}
              compartirHref={libertadEmocionalUrl}
              compartirLabel={t('resources_emotional_freedom')}
            />
            <DocCard
              title={t('resources_marriage_counseling')}
              previewImg={previewClavesConsejeria}
              leerTo={leerClavesConsejeria}
              descargarHref={clavesConsejeriaUrl}
              compartirHref={clavesConsejeriaUrl}
              compartirLabel={t('resources_marriage_counseling')}
            />
          </div>
        </section>

        {/* 3. Seminario */}
        <section className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center flex items-center justify-center gap-2">
            <DocumentTextIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-300" />
            {t('resources_seminar')}
          </h3>
          <div className="text-center text-gray-500 dark:text-gray-400">
            {t('resources_seminar_coming_soon')}
          </div>
        </section>
      </div>
    </div>
  );
};

const RecursosPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        <RecursosView />
      </main>
    </div>
  );
};

export default RecursosPage;