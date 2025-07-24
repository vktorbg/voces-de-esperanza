import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF_URL = "/pdfs/Guia-biblica-sobre-la-decision-del-matrimonio.pdf";

const GuiaBiblicaDecisionMatrimonioPDF = () => {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Guía bíblica sobre la decisión del matrimonio</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 w-full max-w-3xl">
        <Document
          file={PDF_URL}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-center py-8">Cargando PDF...</div>}
        >
          <Page pageNumber={pageNumber} width={window.innerWidth > 600 ? 600 : window.innerWidth - 32} />
        </Document>
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            Página anterior
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Página {pageNumber} de {numPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
          >
            Página siguiente
          </button>
        </div>
        <div className="mt-6 text-center">
          <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">Descargar PDF completo</a>
        </div>
      </div>
    </div>
  );
};

export default GuiaBiblicaDecisionMatrimonioPDF;
