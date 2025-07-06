// File: voces-de-esperanza/src/pages/historial.js

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link } from "gatsby";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, addDays, subDays, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

// --- Iconos ---
// (Todos los SVGs que sí funcionan bien se mantienen)
const BookOpenIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /> </svg> );
const PlayCircleIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /> </svg> );
const UsersIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> </svg> );
const DocumentTextIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> </svg> );
const ExclamationTriangleIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>);
const ChevronLeftIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>);
const ArrowLeftIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>);
const ChevronRightIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>);
// Se elimina el SVG de TodayIcon que no funcionaba visualmente

// --- COMPONENTES DE UI ---
const DateNavigator = ({ currentDate, onPrev, onNext, onOpenCalendar, isNextDisabled }) => {
    const formattedDate = useMemo(() => {
        if (isToday(currentDate)) return 'Hoy';
        if (isToday(addDays(currentDate, 1))) return 'Ayer';
        return format(currentDate, "EEEE, d 'de' LLLL", { locale: es });
    }, [currentDate]);

    return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg flex items-center justify-between w-full max-w-xs mx-auto border border-gray-200 dark:border-gray-700">
            <button onClick={onPrev} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <ChevronLeftIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
            <button onClick={onOpenCalendar} className="text-md sm:text-lg font-bold text-blue-600 dark:text-blue-400 capitalize hover:underline text-center px-2 grow">
                {formattedDate}
            </button>
            <button onClick={onNext} disabled={isNextDisabled} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRightIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
        </div>
    );
};
const DevotionalCard = ({ devotional }) => ( <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 animate-fade-in w-full"> <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"> {format(new Date(devotional.fecha), "EEEE, d 'de' LLLL 'de' yyyy", { locale: es, timeZone: 'UTC' })} </div> <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">🌟 {devotional.titulo}</h2> <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700"> <div className="font-semibold text-gray-700 dark:text-gray-200">📖 Versículo Clave:</div> <div className="text-blue-600 dark:text-blue-400 uppercase font-semibold">{devotional.versiculo}</div> <div className="text-gray-600 dark:text-gray-300 mt-1">{devotional.cita}</div> </div> <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"> {devotional.reflexion && <p><strong>Reflexión:</strong> {devotional.reflexion}</p>} {devotional.pregunta && <p><strong>Pregunta:</strong> {devotional.pregunta}</p>} {devotional.aplicacion && <p><strong>Aplicación:</strong> {devotional.aplicacion}</p>} </div> </div> );
const FullScreenLoader = () => (<div className="flex-grow flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>);
const ErrorState = ({ onRetry }) => ( <div className="mt-8 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg p-6 flex flex-col items-center"> <ExclamationTriangleIcon className="w-12 h-12 text-red-400 mb-4" /> <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error al cargar los datos</h3> <p className="text-red-600 dark:text-red-300 mb-6">No pudimos obtener los devocionales.</p> <button onClick={onRetry} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"> Reintentar </button> </div> );

// --- Página Principal ---
const HistorialPage = () => {
    const [devotionals, setDevotionals] = useState(new Map());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const calendarPopupRef = useRef(null);

    const fetchAllDevotionals = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/get-all-devotionals');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const devotionalMap = new Map(data.map(d => [format(new Date(d.fecha), 'yyyy-MM-dd'), d]));
            setDevotionals(devotionalMap);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchAllDevotionals(); }, [fetchAllDevotionals]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarPopupRef.current && !calendarPopupRef.current.contains(event.target)) {
                setCalendarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCalendarOpen(false);
    };

    const isNextDayDisabled = useMemo(() => isToday(selectedDate) || selectedDate > new Date(), [selectedDate]);
    const selectedDevotional = useMemo(() => devotionals.get(format(selectedDate, 'yyyy-MM-dd')), [devotionals, selectedDate]);
    const navItems = [ { name: "Devocional", path: "/", icon: BookOpenIcon }, { name: "Videos", path: "/videos/", icon: PlayCircleIcon }, { name: "Quiénes somos", path: "/quienes-somos/", icon: UsersIcon }, { name: "Recursos", path: "/recursos/", icon: DocumentTextIcon }];
    
    const renderContent = () => {
        if (isLoading) return <FullScreenLoader />;
        if (error) return <ErrorState onRetry={fetchAllDevotionals} />;
        return selectedDevotional ? (<DevotionalCard devotional={selectedDevotional} />) : (<div className="text-center mt-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"> <p className="font-semibold text-gray-700 dark:text-gray-200">Sin devocional para este día.</p> <p className="text-sm text-gray-500 dark:text-gray-400">Prueba con otra fecha.</p> </div>);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <main className="flex flex-col flex-grow items-center pt-4 sm:pt-6 pb-24 sm:pb-28 px-4">
                <div className="w-full max-w-md sm:max-w-2xl mx-auto flex flex-col items-center flex-grow">
                    
                    <div className="relative w-full text-center mb-6">
                        <Link to="/" title="Volver al Inicio" className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Historial</h1>
                    </div>

                    <div className="w-full my-4 flex items-center justify-center gap-2">
                        <div className="flex-grow">
                            <DateNavigator
                                currentDate={selectedDate}
                                onPrev={() => setSelectedDate(subDays(selectedDate, 1))}
                                onNext={() => setSelectedDate(addDays(selectedDate, 1))}
                                isNextDisabled={isNextDayDisabled}
                                onOpenCalendar={() => setCalendarOpen(true)}
                            />
                        </div>
                        {/* --- CAMBIO PRINCIPAL AQUÍ --- */}
                        <button onClick={() => setSelectedDate(new Date())} disabled={isToday(selectedDate)} title="Ir a Hoy" className="flex-shrink-0 p-2.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed">
                            {/* Se usa una etiqueta <img> en lugar de un SVG */}
                            <img src="https://img.icons8.com/color/96/today.png" alt="Hoy" className="w-6 h-6"/>
                        </button>
                    </div>
                    
                    <div className="flex-grow w-full mt-4">{renderContent()}</div>
                </div>
            </main>

            {isCalendarOpen && (
                <div className="calendar-popup-overlay animate-fade-in">
                    <div ref={calendarPopupRef} className="calendar-popup-content animate-slide-in-up">
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            maxDate={new Date()}
                            locale="es-ES"
                            tileContent={({ date, view }) => {
                                if (view === 'month' && devotionals.has(format(date, 'yyyy-MM-dd'))) {
                                    return <div className="devotional-dot"></div>;
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-top-lg z-50">
                <div className="flex justify-around max-w-md mx-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.name} to={item.path} className="flex flex-col items-center justify-center flex-1 py-2.5 sm:py-3 px-1 text-center focus:outline-none transition-all duration-200 ease-in-out group text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300" activeClassName="!text-blue-600 dark:!text-blue-400 scale-105" partiallyActive={item.path !== "/"}>
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

export default HistorialPage;