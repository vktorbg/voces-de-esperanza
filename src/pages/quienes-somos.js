// File: voces-de-esperanza/src/pages/quienes-somos.js

import React from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";


const QuienesSomosView = () => {
  const { t } = useTranslation();
  
  return (
    // === AÑADIDO: contenedor con padding superior e inferior para safe-area ===
    <div className="pt-[env(safe-area-inset-top)] pb-12">
      <div className="font-sans w-full max-w-md sm:max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
           style={{ maxWidth: '95vw' }}>
      {/* Banner with Background Image */}
      <div className="relative h-48 sm:h-64">
        <img 
          src="/banner-nosotros.jpg" // Assumes banner-nosotros.jpg is in /static folder
          alt={t('about_banner_alt')} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center p-4">
          <img 
            src="/icon.jpg" 
            alt="Icon" 
            className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3 opacity-90 rounded-lg object-cover"
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-sm">{t('about_title')}</h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-md">{t('about_subtitle')}</p>
        </div>
      </div>

      {/* Content area with padding */}
      <div className="p-4 sm:p-6">
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          <p>
            <strong>{t('app_name')}</strong> {t('about_description_1')} <strong>{t('about_ayuda_para_vivir')}</strong> {t('about_description_2')} <strong>{t('about_training_team')}</strong>. {t('about_description_3')}
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>{t('about_area_1')},</li>
            <li>{t('about_area_2')} {t('about_area_3')}</li>
            <li>{t('about_area_4')} ({t('about_ayuda_para_vivir')})</li>
          </ul>
          <p>
            <strong>{t('about_ayuda_para_vivir')}</strong> {t('about_ayuda_description')}
          </p>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{t('about_team_intro')} <strong>{t('about_training_team')}</strong> {t('about_team_composed')}:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Phil English:</strong> {t('about_role_director')}.</li>
              <li><strong>Christopher e Irys Chantres:</strong> {t('about_role_counselors')}.</li>
              <li><strong>Bernabé Vázquez:</strong> {t('about_role_pastor')}.</li>
              <li><strong>Misael Cabrera:</strong> {t('about_role_tutor')}.</li>
              <li><strong>Lilia Meza:</strong> {t('about_role_pastora')}.</li>
              <li><strong>Víctor Briceño:</strong> {t('about_role_technical_director')}.</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 pb-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
              {t('about_connect_title')}
            </h3>
            <div className="space-y-3 text-center">
              <div className="text-gray-700 dark:text-gray-300">
                <strong className="block sm:inline mb-1 sm:mb-0">{t('about_whatsapp')}:</strong>
                <a href="https://wa.me/522223614495" target="_blank" rel="noopener noreferrer" className="ml-0 sm:ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 block sm:inline">
                  +52 222 361 4495
                </a>
                <span className="mx-2 hidden sm:inline text-gray-400 dark:text-gray-500">|</span>
                <a href="https://wa.me/522462945809" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 block sm:inline mt-1 sm:mt-0">
                  +52 246 294 5809
                </a>
                <span className="mx-2 hidden sm:inline text-gray-400 dark:text-gray-500">|</span>
                <a href="https://wa.me/522331181457" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 block sm:inline mt-1 sm:mt-0">
                  +52 233 118 1457
                </a>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong className="block sm:inline mb-1 sm:mb-0">{t('about_email')}:</strong>
                <a href="mailto:voces.deesperanza025@gmail.com" className="ml-0 sm:ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 block sm:inline">
                  voces.deesperanza025@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Privacy Policy Link */}
          <div className="mt-6 text-center text-sm">
            <Link 
              to="/politica-de-privacidad/" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:underline transition-colors"
            >
              {t('about_privacy_policy')}
            </Link>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
};


// Page component that includes QuienesSomosView
const QuienesSomosPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        <QuienesSomosView />
      </main>
    </div>
  );
};

export default QuienesSomosPage;