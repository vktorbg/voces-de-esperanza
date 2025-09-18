// File: voces-de-esperanza/src/pages/recursos/claves-consejeria-matrimonial-react-pdf.js

import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Capacitor } from '@capacitor/core';

// --- Icon Components ---
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
// --- Fin Icon Components ---

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
}

const ClavesConsejeriaMatrimonialReactPdfPage = () => {
  const [numPages, setNumPages] = useState(null);
  const [documentError, setDocumentError] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const contentContainerRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Cambia aquí la ruta al PDF correcto
  const pdfPath = "/pdfs/Claves-Consejeria-Matrimonial.pdf";

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
    setDocumentError(null);
  }

  function onDocumentLoadError(error) {
    console.error('Error al cargar el documento PDF:', error);
    setDocumentError('No se pudo cargar el estudio. Por favor, inténtalo de nuevo más tarde o verifica que el archivo exista.');
  }

  useEffect(() => {
    const setPdfPageWidth = () => {
      if (contentContainerRef.current) {
        setContainerWidth(contentContainerRef.current.getBoundingClientRect().width);
      }
    };
    const setFixedHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    setPdfPageWidth();
    setFixedHeaderHeight();

    window.addEventListener('resize', setPdfPageWidth);
    window.addEventListener('resize', setFixedHeaderHeight);

    return () => {
      window.removeEventListener('resize', setPdfPageWidth);
      window.removeEventListener('resize', setFixedHeaderHeight);
    };
  }, []);

  const navItems = [
    { name: "Devocionales", path: "/", icon: BookOpenIcon },
    { name: "Videos", path: "/videos/", icon: PlayCircleIcon },
    { name: "Quiénes somos", path: "/quienes-somos/", icon: UsersIcon },
    { name: "Recursos", path: "/recursos/", icon: DocumentTextIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header Fijo con Botón de Regreso y Título */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-20 bg-gray-100 dark:bg-gray-900 py-3 shadow-md"
      >
        <div className="flex items-center justify-between max-w-xl mx-auto px-4">
          <Link
            to="/recursos/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Volver a Recursos
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center flex-grow ml-4">
            Claves Consejería Matrimonial
          </h1>
        </div>
      </div>

      <main
        className="flex-grow overflow-y-auto pb-24 sm:pb-28"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 mt-4" ref={contentContainerRef}>
          {documentError && (
            <div className="text-center text-red-500 p-4 bg-red-100 dark:bg-red-900 border border-red-500 rounded-md">
              {documentError}
            </div>
          )}

          {!documentError && (
            <div className="pdf-container bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <Document
                file={pdfPath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div className="text-center p-10">Cargando estudio...</div>}
                error={<div className="text-center p-10 text-red-500">Error al cargar el PDF.</div>}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={containerWidth ? Math.min(containerWidth, 800) : undefined}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="mb-1"
                  />
                ))}
              </Document>
            </div>
          )}
        </div>
      </main>

      {/* Barra de Navegación Inferior */}
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

export default ClavesConsejeriaMatrimonialReactPdfPage;