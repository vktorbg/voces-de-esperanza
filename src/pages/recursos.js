// File: voces-de-esperanza/src/pages/recursos.js

import React from "react";
import { Link } from "gatsby"; // Import Link from Gatsby

// --- Icon Components (Heroicons - outline style) ---
// Needed for RecursosView and the Navigation bar
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

const DocumentTextIcon = (props) => ( // This icon is used by RecursosView and nav
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
// --- End Icon Components ---


const RecursosView = () => {
  return (
    // Removed px-2 from this className as per earlier discussion
    <div className="font-sans w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
         style={{ maxWidth: '95vw' }}> {/* Consider if 95vw is better for consistency or if 98vw is desired */}
      {/* Banner superior */}
      <div className="relative h-44 sm:h-60">
        <img
          src="/banner-recursos.jpg" // Assumes banner-recursos.jpg is in /static folder
          alt="Recursos banner background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-800/60 to-transparent flex flex-col items-center justify-center text-center p-4">
          <DocumentTextIcon className="w-14 h-14 sm:w-20 sm:h-20 text-white mb-2 sm:mb-3 opacity-90 drop-shadow" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 shadow-sm drop-shadow">Recursos para el Liderazgo</h2>
          <p className="text-xs sm:text-base text-gray-100 max-w-md drop-shadow">Materiales para tu crecimiento espiritual y liderazgo.</p>
        </div>
      </div>

      {/* Secciones - This div now handles all padding for the content below the banner */}
      <div className="p-4 sm:p-8 space-y-7">
        {/* Discipulado */}
        <section className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow flex flex-col items-center px-4 py-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpenIcon className="w-6 h-6 text-green-800 dark:text-green-300" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recursos para el Discipulado</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center max-w-md">
            Herramientas y materiales para el acompañamiento y formación de discípulos, enfocados en el crecimiento personal y espiritual.
          </p>
          <a
            href="/pdfs/Manual%20del%20Estudiante.pdf" // Assumes PDFs are in /static/pdfs/
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white font-semibold px-5 py-2 rounded-md shadow transition text-base"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Manual del Estudiante
          </a>
        </section>
        {/* Seminario */}
        <section className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow flex flex-col items-center px-4 py-6">
          <div className="flex items-center gap-2 mb-2">
            <DocumentTextIcon className="w-6 h-6 text-indigo-800 dark:text-indigo-300" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recursos del Seminario</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center max-w-md">
            Materiales de apoyo, guías y manuales para maestros y líderes en el proceso de enseñanza y formación bíblica.
          </p>
          <a
            href="/pdfs/Manual%20del%20Maestro.pdf" // Assumes PDFs are in /static/pdfs/
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-5 py-2 rounded-md shadow transition text-base"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Manual del Maestro
          </a>
        </section>
      </div>
    </div>
  );
};


// Page component that includes RecursosView and the Navigation
const RecursosPage = () => {
  const navItems = [
    { name: "Devocionales", path: "/", icon: BookOpenIcon },
    { name: "Videos", path: "/videos/", icon: PlayCircleIcon },
    { name: "Quiénes somos", path: "/quienes-somos/", icon: UsersIcon },
    { name: "Recursos", path: "/recursos/", icon: DocumentTextIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        <RecursosView />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-top-lg z-50">
        <div className="flex justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon; 
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex flex-col items-center justify-center flex-1 py-2.5 sm:py-3 px-1 text-center focus:outline-none transition-all duration-200 ease-in-out group text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
                activeClassName="!text-blue-600 dark:!text-blue-400 scale-105"
                partiallyActive={item.path !== "/"} 
              >
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

export default RecursosPage;