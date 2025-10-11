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
  NETWORK_STATUS: 'network_status',
};

const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 horas en milisegundos

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
    await Preferences.set({
      key: CACHE_KEYS.DEVOTIONALS,
      value: JSON.stringify(devotionals),
    });
    await Preferences.set({
      key: CACHE_KEYS.LAST_SYNC,
      value: Date.now().toString(),
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
 * Verifica si el cache es reciente
 */
const isCacheValid = async () => {
  try {
    const { value } = await Preferences.get({ key: CACHE_KEYS.LAST_SYNC });
    if (!value) return false;
    
    const lastSync = parseInt(value, 10);
    const now = Date.now();
    const isValid = (now - lastSync) < CACHE_DURATION;
    
    console.log(`🕐 Cache age: ${Math.round((now - lastSync) / 1000 / 60)} minutes (valid: ${isValid})`);
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
      // Audio URLs normalizados
      audioEspanol: entry.fields.audioEspanol ? {
        file: {
          url: entry.fields.audioEspanol.fields?.file?.url || null
        }
      } : null,
      audioNahuatl: entry.fields.audioNahuatl ? {
        file: {
          url: entry.fields.audioNahuatl.fields?.file?.url || null
        }
      } : null,
      audioEnglish: entry.fields.audioEnglish ? {
        file: {
          url: entry.fields.audioEnglish.fields?.file?.url || null
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
    
    const response = await client.getEntries({
      content_type: 'devotional', // Ajusta esto según tu Content Type ID
      locale: locale,
      limit: 1000, // Ajusta según necesites
      order: '-fields.date', // Ordenar por fecha descendente
    });

    console.log(`✅ Fetched ${response.items.length} devotionals from Contentful`);
    
    const transformed = response.items
      .map(transformContentfulEntry)
      .filter(Boolean); // Eliminar nulos

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
 */
export const getDevotionalByDate = async (date, locale = 'es-MX') => {
  const { devotionals, source, isOnline } = await getDevotionals(locale);
  
  if (!devotionals || devotionals.length === 0) {
    return { devotional: null, source, isOnline };
  }
  
  // Formatear la fecha para comparación
  const targetDate = formatDate(date);
  
  // Buscar devocional que coincida con la fecha
  const devotional = devotionals.find(d => {
    if (!d.date) return false;
    const dDate = formatDate(new Date(d.date));
    return dDate === targetDate;
  });
  
  console.log(`📅 Found devotional for ${targetDate}:`, !!devotional);
  
  return {
    devotional: devotional || devotionals[0], // Fallback al más reciente
    source,
    isOnline,
    allDevotionals: devotionals,
  };
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
