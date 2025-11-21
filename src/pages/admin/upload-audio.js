import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import Layout from '../../components/Layout';

const AdminUploadAudio = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [converting, setConverting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    // Form fields
    const [selectedFile, setSelectedFile] = useState(null);
    const [date, setDate] = useState('');
    const [language, setLanguage] = useState('es');

    const ffmpegRef = useRef(new FFmpeg());
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

    // Auth
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Load FFmpeg
    useEffect(() => {
        const loadFFmpeg = async () => {
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
            const ffmpeg = ffmpegRef.current;

            try {
                await ffmpeg.load({
                    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
                });
                setFfmpegLoaded(true);
                console.log('✅ FFmpeg loaded');
            } catch (error) {
                console.error('❌ Error loading FFmpeg:', error);
                setMessage('Error al cargar el conversor. Recarga la página.');
            }
        };

        if (user && !ffmpegLoaded) {
            loadFFmpeg();
        }
    }, [user, ffmpegLoaded]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('✅ Autenticado correctamente');
        } catch (error) {
            setMessage('❌ Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        setMessage('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setMessage('');
        }
    };

    const convertToM4A = async (inputFile) => {
        const ffmpeg = ffmpegRef.current;
        const inputName = 'input.' + inputFile.name.split('.').pop();
        const outputName = 'output.m4a';

        try {
            // Write input file to FFmpeg virtual filesystem
            await ffmpeg.writeFile(inputName, await fetchFile(inputFile));

            // Run FFmpeg conversion
            await ffmpeg.exec([
                '-i', inputName,
                '-c:a', 'aac',
                '-b:a', '96k',
                '-ac', '1', // Mono
                '-ar', '44100',
                outputName
            ]);

            // Read output file
            const data = await ffmpeg.readFile(outputName);

            // Create blob from output
            const blob = new Blob([data.buffer], { type: 'audio/mp4' });

            // Cleanup
            await ffmpeg.deleteFile(inputName);
            await ffmpeg.deleteFile(outputName);

            return blob;
        } catch (error) {
            console.error('Conversion error:', error);
            throw error;
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile || !date || !language) {
            setMessage('⚠️ Por favor completa todos los campos');
            return;
        }

        if (!ffmpegLoaded) {
            setMessage('⚠️ El conversor aún está cargando, espera un momento...');
            return;
        }

        setConverting(true);
        setMessage('🔄 Convirtiendo audio...');

        try {
            // Convert to M4A
            const m4aBlob = await convertToM4A(selectedFile);

            setConverting(false);
            setUploading(true);
            setMessage('☁️ Subiendo a Firebase...');

            // Create filename
            const filename = `${date}-${language}.m4a`;
            const storagePath = `devocionales/${filename}`;

            // Upload to Firebase
            const storageRef = ref(storage, storagePath);
            await uploadBytes(storageRef, m4aBlob, {
                contentType: 'audio/mp4',
                customMetadata: {
                    originalName: selectedFile.name,
                    uploadedBy: user.email,
                    uploadedAt: new Date().toISOString()
                }
            });

            // Get public URL
            const downloadURL = await getDownloadURL(storageRef);

            setMessage(`✅ ¡Audio subido exitosamente!\n📁 ${filename}\n🔗 ${downloadURL}`);

            // Reset form
            setSelectedFile(null);
            setDate('');
            setLanguage('es');
            document.getElementById('audio-file').value = '';

        } catch (error) {
            console.error('Upload error:', error);
            setMessage('❌ Error: ' + error.message);
        } finally {
            setConverting(false);
            setUploading(false);
        }
    };

    // Login UI
    if (!user) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                                🔐 Acceso Admin
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                                Panel de administración - Subida de audios
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Contraseña"
                                    />
                                </div>
                            </div>

                            {message && (
                                <div className={`text-sm text-center ${message.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                            >
                                {loading ? 'Autenticando...' : 'Iniciar Sesión'}
                            </button>
                        </form>
                    </div>
                </div>
            </Layout>
        );
    }

    // Upload UI
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-white">🎙️ Subir Audio</h1>
                                <p className="text-blue-100 text-sm">Bienvenido, {user.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Cerrar Sesión
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleUpload} className="p-6 space-y-6">
                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Archivo de Audio
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {selectedFile ? (
                                                <>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        ✅ {selectedFile.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click para seleccionar</span> o arrastra aquí
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        OPUS, MP3, OGG, WAV (MAX 10MB)
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            id="audio-file"
                                            type="file"
                                            className="hidden"
                                            accept="audio/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Fecha del Devocional
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            {/* Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Idioma
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { code: 'es', label: '🇪🇸 Español', name: 'Español' },
                                        { code: 'en', label: '🇺🇸 English', name: 'English' },
                                        { code: 'nah', label: '🌎 Náhuatl', name: 'Náhuatl' }
                                    ].map(lang => (
                                        <label
                                            key={lang.code}
                                            className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${language === lang.code
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="language"
                                                value={lang.code}
                                                checked={language === lang.code}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className="hidden"
                                            />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {lang.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Preview */}
                            {selectedFile && date && language && (
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        📋 Preview:
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Nombre final: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{date}-{language}.m4a</code>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Ubicación: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">devocionales/{date}-{language}.m4a</code>
                                    </p>
                                </div>
                            )}

                            {/* Status Message */}
                            {message && (
                                <div className={`p-4 rounded-md ${message.includes('❌')
                                        ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                        : message.includes('⚠️')
                                            ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                            : 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                    }`}>
                                    <pre className="text-sm whitespace-pre-wrap font-mono">{message}</pre>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={converting || uploading || !ffmpegLoaded}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {!ffmpegLoaded ? (
                                    '⏳ Cargando conversor...'
                                ) : converting ? (
                                    '🔄 Convirtiendo...'
                                ) : uploading ? (
                                    '☁️ Subiendo...'
                                ) : (
                                    '🚀 Convertir y Subir'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Instructions */}
                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                            📖 Instrucciones:
                        </h3>
                        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
                            <li>Selecciona el archivo de audio (puede ser OPUS, MP3, etc.)</li>
                            <li>Elige la fecha del devocional</li>
                            <li>Selecciona el idioma correspondiente</li>
                            <li>Click en "Convertir y Subir"</li>
                            <li>El audio se convertirá a M4A y se subirá automáticamente</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminUploadAudio;
