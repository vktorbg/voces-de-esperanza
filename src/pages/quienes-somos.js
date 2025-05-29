// File: voces-de-esperanza/src/pages/quienes-somos.js

import React from "react";
import { Link } from "gatsby"; // Import Link from Gatsby

// --- Icon Components (Heroicons - outline style) ---
// Needed for QuienesSomosView and the Navigation bar
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

const UsersIcon = (props) => ( // This icon is used by QuienesSomosView and nav
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


const QuienesSomosView = () => {
  return (
    <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
         style={{ maxWidth: '95vw' }}>
      {/* Banner with Background Image */}
      <div className="relative h-48 sm:h-64">
        <img 
          src="/banner-nosotros.jpg" // Assumes banner-nosotros.jpg is in /static folder
          alt="Quiénes Somos banner background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center p-4">
          <UsersIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white mb-2 sm:mb-3 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-sm">Quiénes Somos</h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-md">Conoce el corazón y la misión detrás de Voces de Esperanza.</p>
        </div>
      </div>

      {/* Content area with padding */}
      <div className="p-4 sm:p-6">
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          <p>
            <strong>Voces de Esperanza</strong> es un proyecto conjunto entre <strong>Ayuda para Vivir</strong> y nuestro <strong>Equipo de Capacitación</strong>. Este proyecto ofrece capacitación en discipulado y liderazgo en las siguientes áreas ministeriales bíblicas:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>Desarrollo de Liderazgo,</li>
            <li>El Seminario de Semillas y</li>
            <li>Discipulado Enfocado (Ayuda para Vivir)</li>
          </ul>
          <p>
            <strong>Ayuda para Vivir</strong> es un ministerio de consejería bíblica enfocado en ayudar a las personas a usar herramientas bíblicas para encontrar libertad y crecimiento espiritual. Christopher Chantres y su esposa dirigen este ministerio en Puebla, México.
          </p>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Nuestro <strong>Equipo de Capacitación</strong> está compuesto por:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Phil English:</strong> Director.</li>
              <li><strong>Christopher e Irys Chantres:</strong> Consejeros.</li>
              <li><strong>Pastor Bernabé Vázquez:</strong> Pastor.</li>
              <li><strong>Misael Cabrera:</strong> Tutor.</li>
              <li><strong>Pastora Lilia Meza:</strong> Pastora.</li>
              <li><strong>Víctor Briceño:</strong> Director técnico.</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 pb-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
              ¡Conéctate con nosotros!
            </h3>
            <div className="space-y-3 text-center">
              <div className="text-gray-700 dark:text-gray-300">
                <strong className="block sm:inline mb-1 sm:mb-0">WhatsApp:</strong>
                <a href="https://wa.me/522223614495" target="_blank" rel="noopener noreferrer" className="ml-0 sm:ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 block sm:inline">
                  +52 222 361 4495
                </a>
                <span className="mx-2 hidden sm:inline text-gray-400 dark:text-gray-500">|</span>
                <a href="https://wa.me/522462945809" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 block sm:inline mt-1 sm:mt-0">
                  +52 246 294 5809
                </a>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong className="block sm:inline mb-1 sm:mb-0">Correo:</strong>
                <a href="mailto:voces.deesperanza025@gmail.com" className="ml-0 sm:ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 block sm:inline">
                  voces.deesperanza025@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Page component that includes QuienesSomosView and the Navigation
const QuienesSomosPage = () => {
  const navItems = [
    { name: "Devocionales", path: "/", icon: BookOpenIcon },
    { name: "Videos", path: "/videos/", icon: PlayCircleIcon },
    { name: "Quiénes somos", path: "/quienes-somos/", icon: UsersIcon },
    { name: "Recursos", path: "/recursos/", icon: DocumentTextIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        <QuienesSomosView />
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

export default QuienesSomosPage;