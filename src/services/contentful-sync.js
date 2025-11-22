// src/services/contentful-sync.js
// Servicio para sincronizar devocionales desde Contentful en runtime

import { createClient } from 'contentful';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

// Cliente de Contentful (usando variables de entorno)
let contentfulClient = null;

const getContentfulClient = () => {
  if (!contentfulClient) {
    // Usar variables con prefijo GATSBY_ para que estén disponibles en el cliente
    const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
    const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;

    if (!spaceId || !accessToken) {
      console.warn('⚠️ Contentful credentials not found. Runtime sync disabled.');
      return null;
    }

    contentfulClient = createClient({
      space: spaceId,
      accessToken: accessToken,
    });
  }
  return contentfulClient;
};

// Constantes de cache
const CACHE_KEYS = {
  DEVOTIONALS: 'devotionals_cache',
  LAST_SYNC: 'devotionals_last_sync',
  CACHE_DATE: 'devotionals_cache_date', // Nueva: fecha del cache
  NETWORK_STATUS: 'network_status',
};

// Cache de TEXTO: 30 minutos (para permitir correcciones durante el día)
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos en milisegundos
// NOTA: Los audios NO usan cache, siempre se fetch en cada apertura

/**
 * Verifica si hay conexión a internet
 */
export const checkNetworkStatus = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      const status = await Network.getStatus();
      return status.connected;
    } else {
      // En web, usar navigator.onLine
      return typeof navigator !== 'undefined' ? navigator.onLine : true;
    }
  } catch (error) {
    console.error('Error checking network status:', error);
    return false;
  }
};

/**
 * Guarda devocionales en cache local
 */
const saveToCache = async (devotionals) => {
  try {
    const now = new Date();
    await Preferences.set({
      key: CACHE_KEYS.DEVOTIONALS,
      value: JSON.stringify(devotionals),
    });
    await Preferences.set({
      key: CACHE_KEYS.LAST_SYNC,
      value: now.getTime().toString(),
    });
    // Guardar la fecha (YYYY-MM-DD) del cache para invalidar a medianoche
    await Preferences.set({
      key: CACHE_KEYS.CACHE_DATE,
      value: now.toISOString().split('T')[0],
    });
    console.log('✅ Devotionals saved to cache:', devotionals.length);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

/**
 * Lee devocionales desde cache local
 */
const readFromCache = async () => {
  try {
    const { value } = await Preferences.get({ key: CACHE_KEYS.DEVOTIONALS });
    if (value) {
      const devotionals = JSON.parse(value);
      console.log('📦 Loaded from cache:', devotionals.length, 'devotionals');
      return devotionals;
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
  return null;
};

/**
 * Verifica si el cache es reciente y del mismo día
 */
const isCacheValid = async () => {
  try {
    const { value: lastSyncValue } = await Preferences.get({ key: CACHE_KEYS.LAST_SYNC });
    const { value: cacheDateValue } = await Preferences.get({ key: CACHE_KEYS.CACHE_DATE });

    if (!lastSyncValue) return false;

    const lastSync = parseInt(lastSyncValue, 10);
    const now = Date.now();
    const ageMinutes = Math.round((now - lastSync) / 1000 / 60);

    // Verificar si es del mismo día
    const today = new Date().toISOString().split('T')[0];
    const cacheDate = cacheDateValue || '';

    // Invalidar si cambió el día (contenido diario)
    if (cacheDate !== today) {
      console.log(`�️ Cache is from ${cacheDate}, today is ${today} - INVALID (different day)`);
      return false;
    }

    // Verificar TTL (2 horas)
    const isValid = (now - lastSync) < CACHE_DURATION;

    console.log(`🕐 Cache age: ${ageMinutes} minutes, date: ${cacheDate} (valid: ${isValid})`);
    return isValid;
  } catch (error) {
    console.error('Error checking cache validity:', error);
    return false;
  }
};

/**
 * Transforma entradas de Contentful al formato esperado por la app
 * Normaliza al mismo formato que GraphQL (Gatsby)
 */
const transformContentfulEntry = (entry) => {
  try {
    // Normalizar reflection (Rich Text) al formato de GraphQL
    let reflectionFormatted = null;
    if (entry.fields.reflection) {
      // Si es Rich Text, tiene nodeType
      if (entry.fields.reflection.nodeType) {
        reflectionFormatted = {
          raw: JSON.stringify(entry.fields.reflection)
        };
      } else if (typeof entry.fields.reflection === 'string') {
        // Si ya es string (no debería pasar, pero por seguridad)
        reflectionFormatted = entry.fields.reflection;
      }
    }

    // Normalizar question (puede ser Rich Text o Long text) al formato de GraphQL
    let questionFormatted = null;
    if (entry.fields.question) {
      if (entry.fields.question.nodeType) {
        // Es Rich Text, convertir a objeto con raw
        questionFormatted = {
          question: JSON.stringify(entry.fields.question)
        };
      } else if (typeof entry.fields.question === 'string') {
        // Es string simple
        questionFormatted = { question: entry.fields.question };
      } else if (entry.fields.question.question) {
        // Ya está en formato correcto
        questionFormatted = entry.fields.question;
      }
    }

    // Normalizar application (puede ser Rich Text o Long text) al formato de GraphQL
    let applicationFormatted = null;
    if (entry.fields.application) {
      if (entry.fields.application.nodeType) {
        // Es Rich Text, convertir a objeto con raw
        applicationFormatted = {
          application: JSON.stringify(entry.fields.application)
        };
      } else if (typeof entry.fields.application === 'string') {
        // Es string simple
        applicationFormatted = { application: entry.fields.application };
      } else if (entry.fields.application.application) {
        // Ya está en formato correcto
        applicationFormatted = entry.fields.application;
      }
    }

    // Debug: Log audio structure for one entry
    if (entry.fields.date === '2025-10-10' && entry.fields.audioEspanol) {
      console.log('🔍 DEBUG Audio Structure for 2025-10-10:', {
        audioEspanol: entry.fields.audioEspanol,
        audioEspanolFields: entry.fields.audioEspanol?.fields,
        audioEspanolFile: entry.fields.audioEspanol?.fields?.file,
        audioEspanolUrl: entry.fields.audioEspanol?.fields?.file?.url,
      });
    }

    return {
      id: entry.sys.id,
      // Usar nombres en inglés como GraphQL
      title: entry.fields.title || '',
      date: entry.fields.date || '',
      bibleVerse: entry.fields.bibleVerse || '',
      quote: entry.fields.quote || '',
      reflection: reflectionFormatted,
      question: questionFormatted,
      application: applicationFormatted,
      // Audio URLs normalizados (assets tienen .fields.file.url)
      audioEspanol: entry.fields.audioEspanol ? {
        file: {
          url: entry.fields.audioEspanol.fields?.file?.url || entry.fields.audioEspanol.file?.url || null
        }
      } : null,
      audioNahuatl: entry.fields.audioNahuatl ? {
        file: {
          url: entry.fields.audioNahuatl.fields?.file?.url || entry.fields.audioNahuatl.file?.url || null
        }
      } : null,
      audioEnglish: entry.fields.audioEnglish ? {
        file: {
          url: entry.fields.audioEnglish.fields?.file?.url || entry.fields.audioEnglish.file?.url || null
        }
      } : null,
      node_locale: entry.sys.locale || 'es-MX',
    };
  } catch (error) {
    console.error('Error transforming entry:', entry.sys.id, error);
    return null;
  }
};

/**
 * Transforma entradas de Contentful cuando se usa withAllLocales
 * Los fields vienen como {fieldName: {'es-MX': value, 'en-US': value}}
 */
const transformContentfulEntryWithLocale = (entry, targetLocale = 'es-MX') => {
  try {
    // Función helper para extraer valor del locale específico
    const getLocaleValue = (field) => {
      if (!field) return null;
      // Si el campo tiene múltiples locales, extraer el deseado
      if (field[targetLocale] !== undefined) return field[targetLocale];
      if (field['es-MX'] !== undefined) return field['es-MX'];
      // Si no tiene locales específicos, devolverlo tal cual (assets)
      return field;
    };

    const title = getLocaleValue(entry.fields.title) || '';
    const date = getLocaleValue(entry.fields.date) || '';
    const bibleVerse = getLocaleValue(entry.fields.bibleVerse) || '';
    const quote = getLocaleValue(entry.fields.quote) || '';
    const reflection = getLocaleValue(entry.fields.reflection);
    const question = getLocaleValue(entry.fields.question);
    const application = getLocaleValue(entry.fields.application);

    // Los assets no tienen locale, están compartidos
    const audioEspanol = entry.fields.audioEspanol;
    const audioNahuatl = entry.fields.audioNahuatl;
    const audioEnglish = entry.fields.audioEnglish;

    // Debug para ver estructura de audios
    if (date === '2025-10-10' && audioEspanol) {
      console.log('🔍 DEBUG withAllLocales Audio for 2025-10-10:', {
        audioEspanol,
        audioEspanolFields: audioEspanol?.fields,
        audioEspanolFile: audioEspanol?.fields?.file,
        audioEspanolUrl: audioEspanol?.fields?.file?.url,
      });
    }

    // Normalizar reflection
    let reflectionFormatted = null;
    if (reflection) {
      if (reflection.nodeType) {
        reflectionFormatted = { raw: JSON.stringify(reflection) };
      } else if (typeof reflection === 'string') {
        reflectionFormatted = reflection;
      }
    }

    // Normalizar question
    let questionFormatted = null;
    if (question) {
      if (question.nodeType) {
        questionFormatted = { question: JSON.stringify(question) };
      } else if (typeof question === 'string') {
        questionFormatted = { question };
      } else if (question.question) {
        questionFormatted = question;
      }
    }

    // Normalizar application
    let applicationFormatted = null;
    if (application) {
      if (application.nodeType) {
        applicationFormatted = { application: JSON.stringify(application) };
      } else if (typeof application === 'string') {
        applicationFormatted = { application };
      } else if (application.application) {
        applicationFormatted = application;
      }
    }

    return {
      id: entry.sys.id,
      title,
      date,
      bibleVerse,
      quote,
      reflection: reflectionFormatted,
      question: questionFormatted,
      application: applicationFormatted,
      // Audio URLs normalizados
      audioEspanol: audioEspanol ? {
        file: {
          url: audioEspanol.fields?.file?.url || audioEspanol.file?.url || null
        }
      } : null,
      audioNahuatl: audioNahuatl ? {
        file: {
          url: audioNahuatl.fields?.file?.url || audioNahuatl.file?.url || null
        }
      } : null,
      audioEnglish: audioEnglish ? {
        file: {
          url: audioEnglish.fields?.file?.url || audioEnglish.file?.url || null
        }
      } : null,
      node_locale: targetLocale,
    };
  } catch (error) {
    console.error('Error transforming entry with locale:', entry.sys.id, error);
    return null;
  }
};


/**
 * Fetch devocionales desde Contentful API
 */
const fetchFromContentful = async (locale = 'es-MX') => {
  const client = getContentfulClient();
  if (!client) {
    console.warn('⚠️ Contentful client not available');
    return null;
  }

  try {
    console.log('🌐 Fetching devotionals from Contentful...');

    // Usar withAllLocales para obtener todos los locales y resolver los assets correctamente
    const response = await client.withAllLocales.getEntries({
      content_type: 'devotional',
      limit: 1000,
      order: '-fields.date',
      include: 10, // Aumentar para asegurar que resuelva los assets
    });

    console.log(`✅ Fetched ${response.items.length} devotionals from Contentful`);

    // Con withAllLocales, los fields vienen como {fieldName: {'es-MX': value, 'en-US': value}}
    // Necesitamos transformar cada entrada para extraer el locale específico
    const transformed = response.items
      .map(entry => transformContentfulEntryWithLocale(entry, locale))
      .filter(Boolean);

    console.log(`📝 Transformed to ${transformed.length} devotionals for locale ${locale}`);

    return transformed;
  } catch (error) {
    console.error('❌ Error fetching from Contentful:', error);
    return null;
  }
};

/**
 * Función principal: Obtiene devocionales (desde cache o API)
 */
export const getDevotionals = async (locale = 'es-MX', forceRefresh = false) => {
  const isOnline = await checkNetworkStatus();

  // Estrategia: Cache-first con revalidación
  if (!forceRefresh) {
    // Intentar leer del cache primero
    const cached = await readFromCache();
    const cacheValid = await isCacheValid();

    if (cached && cacheValid) {
      console.log('✅ Using valid cached devotionals');

      // Si estamos online, sincronizar en background (no bloqueante)
      if (isOnline) {
        console.log('🔄 Syncing in background...');
        fetchFromContentful(locale)
          .then(fresh => {
            if (fresh && fresh.length > 0) {
              saveToCache(fresh);
            }
          })
          .catch(err => console.error('Background sync failed:', err));
      }

      return {
        devotionals: cached,
        source: 'cache',
        isOnline,
      };
    }

    if (cached && !isOnline) {
      console.log('⚠️ Using expired cache (offline)');
      return {
        devotionals: cached,
        source: 'cache-offline',
        isOnline,
      };
    }
  }

  // Si estamos online, fetch desde Contentful
  if (isOnline) {
    const fresh = await fetchFromContentful(locale);

    if (fresh && fresh.length > 0) {
      await saveToCache(fresh);
      console.log('✅ Using fresh devotionals from API');
      return {
        devotionals: fresh,
        source: 'api',
        isOnline,
      };
    }

    // Si el fetch falla pero hay cache, usar cache
    const cached = await readFromCache();
    if (cached) {
      console.log('⚠️ API failed, using cached devotionals');
      return {
        devotionals: cached,
        source: 'cache-fallback',
        isOnline,
      };
    }
  }

  // Sin cache y sin conexión
  console.log('❌ No devotionals available');
  return {
    devotionals: [],
    source: 'none',
    isOnline,
  };
};

/**
 * Obtiene un devocional específico por fecha
 * Si no encuentra el devocional de hoy en cache, fuerza un refresh del API
 */
export const getDevotionalByDate = async (date, locale = 'es-MX') => {
  const targetDate = typeof date === 'string' ? date : formatDate(date);

  // Lógica principal para obtener el devocional
  const getDevotional = async (forceRefresh = false) => {
    const { devotionals, source, isOnline } = await getDevotionals(locale, forceRefresh);

    if (!devotionals || devotionals.length === 0) {
      return { devotional: null, source, isOnline, allDevotionals: [] };
    }

    const found = devotionals.find(d => {
      if (!d.date) return false;
      const devotionalDate = formatDate(d.date);
      return devotionalDate === targetDate;
    });

    const devotionalToReturn = found || devotionals[0]; // Fallback al más reciente

    return {
      devotional: devotionalToReturn,
      source,
      isOnline,
      allDevotionals: devotionals,
    };
  };

  let result = await getDevotional();

  // Si no se encuentra el devocional para hoy, forzar actualización
  const isToday = targetDate === formatDate(new Date());
  if (!result.devotional && isToday && result.isOnline) {
    console.log(`⚠️ Devotional for today (${targetDate}) not found. Forcing API refresh...`);
    result = await getDevotional(true);
  }

  console.log(`📅 Found devotional for ${targetDate}:`, !!result.devotional);

  return result;
};

/**
 * Formatea fecha a YYYY-MM-DD
 */
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Fetch SOLO los audios de un devocional específico (muy liviano, ~2KB)
 * Siempre hace fetch del API, sin cache
 */
export const fetchAudiosOnly = async (date, locale = 'es-MX') => {
  const client = getContentfulClient();
  if (!client) {
    console.warn('⚠️ Contentful client not available for audio fetch');
    return null;
  }

  const isOnline = await checkNetworkStatus();
  if (!isOnline) {
    console.log('📴 Offline, cannot fetch audios');
    return null;
  }

  try {
    const targetDate = typeof date === 'string' ? date : formatDate(date);
    console.log(`🎵 Fetching ONLY audios for ${targetDate}...`);

    // Fetch con select para traer SOLO los campos de audio (optimizado)
    const response = await client.withAllLocales.getEntries({
      content_type: 'devotional',
      'fields.date': targetDate,
      select: 'sys.id,fields.date,fields.audioEspanol,fields.audioNahuatl,fields.audioEnglish',
      include: 10, // Incluir assets
      limit: 1,
    });

    if (response.items.length === 0) {
      console.log(`⚠️ No devotional found for ${targetDate}`);
      return null;
    }

    const entry = response.items[0];

    // Extraer URLs de audios (con locale support)
    const getAudioUrl = (audioField) => {
      if (!audioField) return null;
      // Los assets no tienen locale, están compartidos
      return audioField.fields?.file?.url || audioField.file?.url || null;
    };

    const audios = {
      audioEspanolUrl: getAudioUrl(entry.fields.audioEspanol),
      audioNahuatlUrl: getAudioUrl(entry.fields.audioNahuatl),
      audioEnglishUrl: getAudioUrl(entry.fields.audioEnglish),
    };

    console.log('✅ Audios fetched:', {
      espanol: !!audios.audioEspanolUrl,
      nahuatl: !!audios.audioNahuatlUrl,
      english: !!audios.audioEnglishUrl,
    });

    return audios;
  } catch (error) {
    console.error('❌ Error fetching audios:', error);
    return null;
  }
};

/**
 * Fuerza una sincronización manual
 */
export const forceSync = async (locale = 'es-MX') => {
  console.log('🔄 Force sync initiated...');
  return await getDevotionals(locale, true);
};

/**
 * Limpia el cache (útil para debugging)
 */
export const clearCache = async () => {
  try {
    await Preferences.remove({ key: CACHE_KEYS.DEVOTIONALS });
    await Preferences.remove({ key: CACHE_KEYS.LAST_SYNC });
    console.log('🗑️ Cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Listener de cambios de red (opcional)
export const setupNetworkListener = (callback) => {
  if (Capacitor.isNativePlatform()) {
    Network.addListener('networkStatusChange', (status) => {
      console.log('📡 Network status changed:', status.connected);
      callback(status.connected);
    });
  } else if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      console.log('📡 Network: ONLINE');
      callback(true);
    });
    window.addEventListener('offline', () => {
      console.log('📡 Network: OFFLINE');
      callback(false);
    });
  }
};
