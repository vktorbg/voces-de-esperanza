// File: voces-de-esperanza/src/pages/index.js

import React, { useState } from "react"
import { graphql } from "gatsby"

// --- Icon Components (Heroicons - outline style) ---
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

// YouTubeIcon component is removed as we'll use an <img> tag for external SVG/PNG.
// --- End Icon Components ---

export const query = graphql`
  query DevocionalDelDia {
    allGoogleSpreadsheetHoja1 {
      nodes {
        fecha
        titulo
        versiculo
        cita
        reflexion
        pregunta
        aplicacion
        copytext
      }
    }
  }
`

const DevotionalView = ({ devocional }) => {
  if (!devocional) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow text-center p-8 max-w-2xl mx-auto"> {/* Added max-w-2xl mx-auto for consistency if no devotional */}
        <BookOpenIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Sin devocional para hoy</h2>
        <p className="text-gray-500 dark:text-gray-400">Por favor, revisa más tarde.</p>
      </div>
    );
  }

  return (
    <div className="font-sans max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <img src="/icon.jpg" alt="Logo Voces de Esperanza" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg mr-4 shadow" />
        <div>
          <div className="text-xs text-blue-600 dark:text-blue-400 uppercase font-semibold tracking-wider">VOCES DE ESPERANZA</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">Devocional del día</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {(() => {
              const fechaStr = devocional.fecha.split("T")[0];
              const [y, m, d] = fechaStr.split("-");
              const fechaLocal = new Date(Number(y), Number(m) - 1, Number(d));
              return fechaLocal.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            })()}
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        <span role="img" aria-label="star emoji" className="mr-2">🌟</span>
        {devocional.titulo}
      </h1>

      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-1">
           <span role="img" aria-label="book emoji" className="mr-2">📖</span> Versículo Clave:
        </div>
        <div className="text-blue-600 dark:text-blue-400 uppercase font-semibold text-md sm:text-lg">{devocional.versiculo}</div>
        <div className="text-gray-600 dark:text-gray-300 mt-1">{devocional.cita}</div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">
            <span role="img" aria-label="pray emoji" className="mr-2">🙏</span> Reflexión:
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{devocional.reflexion}</p>
        </div>
        <div>
          <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">
            <span role="img" aria-label="thinking face emoji" className="mr-2">🤔</span> Pregunta:
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{devocional.pregunta}</p>
        </div>
        <div>
          <div className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">
            <span role="img" aria-label="fire emoji" className="mr-2">🔥</span> Aplicación:
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{devocional.aplicacion}</p>
        </div>
      </div>

      {devocional.copytext && (
        <div className="mt-8 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center gap-2"
            onClick={async () => {
              const textToShare = `${devocional.copytext}\n \n ${window.location.href}`;
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: devocional.titulo,
                    text: textToShare,
                  });
                } catch (err) {
                  // usuario canceló o error
                }
              } else {
                navigator.clipboard.writeText(textToShare).then(() =>
                  alert("¡Texto copiado! Puedes pegarlo en WhatsApp, Telegram, etc.")
                );
              }
            }}
          >
            <img
              src="https://img.icons8.com/material-two-tone/96/share-3.png"
              alt="Compartir"
              className="w-5 h-5 mr-2"
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            Compartir Devocional
          </button>
          <div className="text-xs text-gray-400 mt-2">
            {navigator.share
              ? "Puedes compartir en WhatsApp, Telegram, redes sociales, etc."
              : "Si no ves opciones de compartir, el texto se copiará al portapapeles."}
          </div>
        </div>
      )}
    </div>
  );
};

const VideosView = () => {
  const videos = [
    { id: "1kTJjSjxObg", title: "YouTube Short 1" },
    { id: "mH9BtLuElyg", title: "YouTube Short 2" },
    { id: "Bz7w2GZXijQ", title: "YouTube Short 3" },
    { id: "suA4dd5QzjY", title: "YouTube Short 4" },
    { id: "axoHbLM9Gnw", title: "YouTube Short 5" },
    { id: "46xV9VF2y1M", title: "YouTube Short 6" },
  ];
  const youtubeIconUrl = "https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg"; // Red and white YouTube icon

  return (
    <div className="font-sans max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Banner with Background Image */}
      <div className="relative h-48 sm:h-64">
        {/* <!-- REPLACE WITH YOUR IMAGE --> */}
        <img 
          src="/banner-videos.jpg" 
          alt="Video banner background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-center text-center p-4">
          <img 
            src={youtubeIconUrl}
            alt="YouTube" 
            className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3" // Opacity removed, icon has its own colors
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-sm">Nuestros Videos</h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-md">
            Contenido inspirador en videos cortos. ¡Esperanza y sabiduría para tu día!
          </p>
        </div>
      </div>
      
      {/* Content area with padding */}
      <div className="p-4 sm:p-6">
        {/* Shorts en columna, formato vertical */}
        <div className="flex flex-col gap-8 mb-8 items-center">
          {videos.map((video, idx) => (
            <React.Fragment key={video.id}>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col items-center w-[320px] max-w-full mx-auto">
                <div className="relative w-[320px] h-[570px] max-w-full mx-auto"> {/* Aspect ratio for Shorts */}
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-t-lg sm:rounded-lg"
                    src={`https://www.youtube.com/embed/${video.id}?playlist=${video.id}&loop=1&autoplay=0&mute=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              {idx === 0 && ( // Show button after the first video
                <div className="text-center py-4">
                  <a
                    href="https://www.youtube.com/@vocesdesperanza025" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm sm:text-base"
                  >
                    <img src={youtubeIconUrl} alt="" className="w-5 h-5 mr-2" /> {/* Alt empty as button has text */}
                    Visita y Sigue Nuestro Canal
                  </a>
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    ¡No te pierdas nuestros últimos videos!
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuienesSomosView = () => {
  return (
    <div className="font-sans max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Banner with Background Image */}
      <div className="relative h-48 sm:h-64">
        {/* <!-- REPLACE WITH YOUR IMAGE --> */}
        <img 
          src="/banner-nosotros.jpg" 
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
              <li><strong>Dr. Phil English:</strong> Director, misionero canadiense.</li>
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

const RecursosView = () => {
  return (
    <div className="font-sans max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Banner with Background Image */}
      <div className="relative h-48 sm:h-64">
        {/* <!-- REPLACE WITH YOUR IMAGE --> */}
        <img 
          src="/banner-recursos.jpg" 
          alt="Recursos banner background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700 bg-opacity-60 flex flex-col items-center justify-center text-center p-4">
          <DocumentTextIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white mb-2 sm:mb-3 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 shadow-sm">Recursos Bíblicos</h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-md">Materiales para tu crecimiento espiritual.</p>
        </div>
      </div>
      
      {/* Content area with padding */}
      <div className="p-6 sm:p-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Próximamente...</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg max-w-xl mx-auto">
          En esta sección encontrarás una cuidada selección de <strong>recursos bíblicos y lecturas recomendadas</strong> para enriquecer tu estudio de la Palabra y fomentar tu crecimiento espiritual.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg mt-3 max-w-xl mx-auto">
          Estamos trabajando para ofrecerte materiales valiosos que te ayuden a profundizar en tu fe. ¡Vuelve pronto!
        </p>
        <BookOpenIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mt-8"/>
      </div>
    </div>
  );
};


const IndexPage = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Devocionales");

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0');
  const day = String(todayDate.getDate()).padStart(2, '0');
  const hoy = `${year}-${month}-${day}`;

  const devocional = data.allGoogleSpreadsheetHoja1.nodes.find(d => {
    if (!d.fecha) {
        return false;
    }
    const fechaSheet = String(d.fecha).split(" ")[0].split("T")[0];
    return fechaSheet === hoy;
  });
  
  const tabs = [
    { name: "Devocionales", icon: BookOpenIcon },
    { name: "Videos", icon: PlayCircleIcon },
    { name: "Quiénes somos", icon: UsersIcon },
    { name: "Recursos", icon: DocumentTextIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Devocionales":
        return <DevotionalView devocional={devocional} />;
      case "Videos":
        return <VideosView />;
      case "Quiénes somos":
        return <QuienesSomosView />;
      case "Recursos":
        return <RecursosView />;
      default:
        return <DevotionalView devocional={devocional} />; 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col flex-grow overflow-y-auto pt-4 sm:pt-6 pb-24 sm:pb-28">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-top-lg z-50">
        <div className="flex justify-around max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon; 
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex flex-col items-center justify-center flex-1 py-2.5 sm:py-3 px-1 text-center focus:outline-none transition-all duration-200 ease-in-out group
                            ${isActive
                              ? "text-blue-600 dark:text-blue-400 scale-105" 
                              : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
                            }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className={`w-6 h-6 mb-0.5 transition-transform duration-200 ease-in-out ${isActive ? "transform" : "group-hover:scale-110"}`} /> 
                <span className={`text-xs font-medium transition-opacity duration-200 ease-in-out ${isActive ? "opacity-100" : "opacity-90 group-hover:opacity-100"}`}>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default IndexPage;