
import React, { useState, useEffect, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { storage, auth } from '../services/firebase'; // Added auth
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'; // Auth methods
import { Link } from 'gatsby';
import { updateContentfulAudioField } from '../services/contentful-management';

const UploadPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);

  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && !loaded) {
        load();
      }
    });
    return () => unsubscribe();
  }, [loaded]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setAuthError("Error initializing session: " + err.message);
    }
  };

  const handleLogout = async () => {
      try {
          await signOut(auth);
          setLoaded(false); // Reset ffmpeg processing state on logout
      } catch (err) {
          console.error(err);
      }
  };

  const load = async () => {
    setIsLoading(true);
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    
    ffmpeg.on('log', ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
      console.log(message);
    });

    // Load ffmpeg
    try {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setLoaded(true);
        addLog('FFmpeg loaded successfully. Ready to convert.');
    } catch (e) {
        console.error(e);
        addLog(`Error loading FFmpeg: ${e.message}. You may need Cross-Origin headers.`);
    }
    setIsLoading(false);
  };

  const addLog = (msg) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    // Reset statuses
    const newStatus = {};
    [...e.target.files].forEach(f => {
        newStatus[f.name] = 'pending';
    });
    setUploadStatus(newStatus);
  };

  const convertAndUpload = async () => {
    const ffmpeg = ffmpegRef.current;
    if (!loaded) return;

    for (const file of files) {
        try {
            const originalName = file.name;
            const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
            const targetName = `${nameWithoutExt}.m4a`;

            setUploadStatus(prev => ({ ...prev, [originalName]: 'converting' }));
            addLog(`Starting conversion: ${originalName} -> ${targetName}`);

            await ffmpeg.writeFile(originalName, await fetchFile(file));
            
            // Convert to AAC (m4a)
            // -c:a aac specifies the AAC codec
            // -b:a 128k specifies bitrate (good quality for speech)
            // -vn ensures no video is processed if accidental video file
            await ffmpeg.exec(['-i', originalName, '-c:a', 'aac', '-b:a', '128k', '-vn', targetName]);

            const data = await ffmpeg.readFile(targetName);
            const blob = new Blob([data.buffer], { type: 'audio/mp4' });

            addLog(`Conversion complete for ${targetName}. Uploading to Firebase...`);
            setUploadStatus(prev => ({ ...prev, [originalName]: 'uploading' }));

            // Upload to Firebase
            const storageRef = ref(storage, `devocionales/${targetName}`);
            await uploadBytes(storageRef, blob);
            const firebaseUrl = await getDownloadURL(storageRef);

            addLog(`Uploaded to Firebase: ${targetName}`);

            // Extract date and language from filename (e.g., "2025-12-17-es.m4a")
            const dateMatch = targetName.match(/^(\d{4}-\d{2}-\d{2})/);
            const langMatch = targetName.match(/-(\w{2,3})\.m4a$/);

            if (dateMatch && langMatch) {
                const devotionalDate = dateMatch[1];
                const langCode = langMatch[1];

                try {
                    addLog(`Syncing to Contentful for ${devotionalDate} (${langCode})...`);
                    setUploadStatus(prev => ({ ...prev, [originalName]: 'syncing' }));

                    // Update Contentful with Firebase URL
                    await updateContentfulAudioField(devotionalDate, langCode, firebaseUrl);

                    addLog(`✅ Synced to Contentful: ${targetName}`);
                } catch (contentfulError) {
                    console.error('Contentful sync error:', contentfulError);
                    addLog(`⚠️ Firebase upload OK but Contentful sync failed: ${contentfulError.message}`);
                    // Don't fail the whole upload - Firebase URL is still available
                }
            } else {
                addLog(`⚠️ Could not parse date/language from filename: ${targetName}`);
            }

            setUploadStatus(prev => ({ ...prev, [originalName]: 'done' }));

            // Cleanup
            await ffmpeg.deleteFile(originalName);
            await ffmpeg.deleteFile(targetName);

        } catch (err) {
            console.error(err);
            addLog(`Error processing ${file.name}: ${err.message}`);
            setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }));
        }
    }
  };

  // useEffect(() => {
  //   load();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-8 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto w-full">
        <Link to="/" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            &larr; Back to App
        </Link>
        {user && (
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
                Log Out ({user.email})
            </button>
        )}
      </div>
      
      <div className="max-w-3xl mx-auto w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">Devotional Audio Uploader</h1>
        
        {!user ? (
            <div className="max-w-md mx-auto">
                <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded relative mb-6">
                    <strong className="font-bold">Authentication Required. </strong>
                    <span className="block sm:inline">Please sign in to upload files.</span>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {authError && <p className="text-red-500 text-xs italic">{authError}</p>}
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                    </button>
                </form>
            </div>
        ) : (
            <div className="mb-8">
                <p className="text-sm text-gray-600 mb-4">
                    Authenticated. This tool automatically converts your audio files (Ogg, Opus, Wav) to <strong>AAC (.m4a)</strong>.
                </p>

                {!loaded && (
                    <div className="flex items-center gap-3 text-blue-600 bg-blue-50 p-4 rounded-lg">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        <span>Loading conversion engine... (First load may take a moment)</span>
                    </div>
                )}
            
            {loaded && (
                <div className="space-y-4">
                    <label className="block">
                        <span className="sr-only">Choose files</span>
                        <input 
                            type="file" 
                            multiple 
                            accept="audio/*,.opus,.ogg"
                            onChange={handleFileChange} 
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2.5 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            cursor-pointer"
                        />
                    </label>

                    {files.length > 0 && (
                        <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                {files.map((f) => (
                                    <li key={f.name} className="flex justify-between items-center p-3 text-sm">
                                        <span className="truncate max-w-[50%] font-medium text-gray-700">{f.name}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                            ${uploadStatus[f.name] === 'pending' ? 'bg-gray-200 text-gray-600' : ''}
                                            ${uploadStatus[f.name] === 'converting' ? 'bg-yellow-100 text-yellow-700' : ''}
                                            ${uploadStatus[f.name] === 'uploading' ? 'bg-blue-100 text-blue-700' : ''}
                                            ${uploadStatus[f.name] === 'syncing' ? 'bg-purple-100 text-purple-700' : ''}
                                            ${uploadStatus[f.name] === 'done' ? 'bg-green-100 text-green-700' : ''}
                                            ${uploadStatus[f.name] === 'error' ? 'bg-red-100 text-red-700' : ''}
                                        `}>
                                            {uploadStatus[f.name] || 'pending'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button 
                        onClick={convertAndUpload}
                        disabled={files.length === 0 || isLoading}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-[0.99]"
                    >
                        Convert & Upload All
                    </button>
                    
                    <div ref={messageRef} className="text-xs text-gray-400 font-mono mt-2 min-h-[1.5em]"/>
                </div>
            )}
        </div>
        )}

        <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-xs h-40 overflow-y-auto">
            <div className="text-gray-500 mb-2 border-b border-gray-700 pb-1">Activity Log</div>
            {logs.length === 0 && <span className="opacity-50">Waiting for activity...</span>}
            {logs.map((log, i) => (
                <div key={i} className="mb-0.5 whitespace-pre-wrap">{log}</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
