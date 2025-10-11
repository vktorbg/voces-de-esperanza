// src/hooks/useDevotionals.js
// Custom hook para manejar devocionales con sincronización automática

import { useState, useEffect, useCallback } from 'react';
import {
  getDevotionals,
  getDevotionalByDate,
  forceSync,
  checkNetworkStatus,
  setupNetworkListener,
} from '../services/contentful-sync';

export const useDevotionals = (locale = 'es-MX') => {
  const [devotionals, setDevotionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null); // 'cache', 'api', 'cache-offline', etc.
  const [isOnline, setIsOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Función para cargar devocionales
  const loadDevotionals = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const result = await getDevotionals(locale, forceRefresh);
      
      setDevotionals(result.devotionals || []);
      setSource(result.source);
      setIsOnline(result.isOnline);
      
      console.log('📚 Devotionals loaded:', {
        count: result.devotionals?.length || 0,
        source: result.source,
        online: result.isOnline,
      });
    } catch (err) {
      console.error('Error loading devotionals:', err);
      setError(err.message || 'Error loading devotionals');
    } finally {
      setLoading(false);
    }
  }, [locale]);

  // Función para sincronizar manualmente
  const sync = useCallback(async () => {
    try {
      setSyncing(true);
      const result = await forceSync(locale);
      
      setDevotionals(result.devotionals || []);
      setSource(result.source);
      setIsOnline(result.isOnline);
      
      return result;
    } catch (err) {
      console.error('Error syncing:', err);
      throw err;
    } finally {
      setSyncing(false);
    }
  }, [locale]);

  // Cargar devocionales al montar el componente
  useEffect(() => {
    loadDevotionals();
  }, [loadDevotionals]);

  // Listener de cambios de red
  useEffect(() => {
    const handleNetworkChange = async (connected) => {
      setIsOnline(connected);
      
      // Si volvemos online, intentar sincronizar
      if (connected && !loading) {
        console.log('🔄 Network restored, syncing...');
        loadDevotionals(true);
      }
    };

    // Setup listener
    const cleanup = setupNetworkListener(handleNetworkChange);

    // Verificar estado inicial
    checkNetworkStatus().then(setIsOnline);

    return () => {
      // Cleanup si es necesario
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [loadDevotionals, loading]);

  return {
    devotionals,
    loading,
    error,
    source,
    isOnline,
    syncing,
    reload: loadDevotionals,
    sync,
  };
};

/**
 * Hook para obtener un devocional específico por fecha
 */
export const useDevotionalByDate = (date, locale = 'es-MX') => {
  const [devotional, setDevotional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [allDevotionals, setAllDevotionals] = useState([]);

  const loadDevotional = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getDevotionalByDate(date, locale);
      
      setDevotional(result.devotional);
      setSource(result.source);
      setIsOnline(result.isOnline);
      setAllDevotionals(result.allDevotionals || []);
      
      console.log('📖 Devotional loaded for date:', date, {
        found: !!result.devotional,
        source: result.source,
        online: result.isOnline,
      });
    } catch (err) {
      console.error('Error loading devotional:', err);
      setError(err.message || 'Error loading devotional');
    } finally {
      setLoading(false);
    }
  }, [date, locale]);

  useEffect(() => {
    loadDevotional();
  }, [loadDevotional]);

  return {
    devotional,
    allDevotionals,
    loading,
    error,
    source,
    isOnline,
    reload: loadDevotional,
  };
};
