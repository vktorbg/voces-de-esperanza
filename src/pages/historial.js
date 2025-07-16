// File: voces-de-esperanza/src/pages/historial.js

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, addDays, subDays, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

// --- Iconos ---
// (Todos los SVGs que sí funcionan bien se mantienen)
const ExclamationTriangleIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>);
const ChevronLeftIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>);
const ArrowLeftIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>);
const ChevronRightIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>);
// Se elimina el SVG de TodayIcon que no funcionaba visualmente

// --- COMPONENTES DE UI ---
const DateNavigator = ({ currentDate, onPrev, onNext, onOpenCalendar, isNextDisabled }) => {
    const { t } = useTranslation();
    const formattedDate = useMemo(() => {
        if (isToday(currentDate)) return t('history_today');
        if (isToday(addDays(currentDate, 1))) return t('history_yesterday');
        return format(currentDate, "EEEE, d 'de' LLLL", { locale: es });
    }, [currentDate, t]);

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
const DevotionalCard = ({ devotional }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 animate-fade-in w-full">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
                {format(new Date(devotional.fecha), "EEEE, d 'de' LLLL 'de' yyyy", { locale: es, timeZone: 'UTC' })}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">🌟 {devotional.titulo}</h2>
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="font-semibold text-gray-700 dark:text-gray-200">📖 {t('key_verse')}:</div>
                <div className="text-blue-600 dark:text-blue-400 uppercase font-semibold">{devotional.versiculo}</div>
                <div className="text-gray-600 dark:text-gray-300 mt-1">{devotional.cita}</div>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {devotional.reflexion && <p><strong>{t('reflection')}:</strong> {devotional.reflexion}</p>}
                {devotional.pregunta && <p><strong>{t('question')}:</strong> {devotional.pregunta}</p>}
                {devotional.aplicacion && <p><strong>{t('application')}:</strong> {devotional.aplicacion}</p>}
            </div>
        </div>
    );
};
const FullScreenLoader = () => (<div className="flex-grow flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>);
const ErrorState = ({ onRetry }) => {
    const { t } = useTranslation();
    return (
        <div className="mt-8 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg p-6 flex flex-col items-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">{t('history_error_title')}</h3>
            <p className="text-red-600 dark:text-red-300 mb-6">{t('history_error_message')}</p>
            <button onClick={onRetry} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition">
                {t('history_retry')}
            </button>
        </div>
    );
};

// --- Página Principal ---
const HistorialPage = () => {
    const { t } = useTranslation();
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
    
    const renderContent = () => {
        if (isLoading) return <FullScreenLoader />;
        if (error) return <ErrorState onRetry={fetchAllDevotionals} />;
        return selectedDevotional ? (
            <DevotionalCard devotional={selectedDevotional} />
        ) : (
            <div className="text-center mt-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <p className="font-semibold text-gray-700 dark:text-gray-200">{t('history_no_devotional')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('history_try_another_date')}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <main className="flex flex-col flex-grow items-center pt-4 sm:pt-6 pb-24 sm:pb-28 px-4">
                <div className="w-full max-w-md sm:max-w-2xl mx-auto flex flex-col items-center flex-grow">
                    
                    <div className="relative w-full text-center mb-6">
                        <Link to="/" title={t('history_back_to_home')} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{t('history_title')}</h1>
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
                        <button onClick={() => setSelectedDate(new Date())} disabled={isToday(selectedDate)} title={t('history_go_to_today')} className="flex-shrink-0 p-2.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed">
                            {/* Se usa una etiqueta <img> en lugar de un SVG */}
                            <img src="https://img.icons8.com/color/96/today.png" alt={t('history_today')} className="w-6 h-6"/>
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
        </div>
    );
};

export default HistorialPage;