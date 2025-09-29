// src/components/PageHeader.js

import React from 'react';
import { Link } from 'gatsby';

const ArrowLeftIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>);

const PageHeader = ({ title, backTo = null }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto px-4" style={{ maxWidth: '95vw' }}>
        <div className="relative flex items-center justify-center h-16">
          {backTo && (
            <Link to={backTo} className="absolute left-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </Link>
          )}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white truncate">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;