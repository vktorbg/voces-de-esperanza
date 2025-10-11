# 🚀 Implementación de Sincronización en Tiempo Real - Fase 1

## 📋 Resumen de Cambios

Se ha implementado un sistema **híbrido de carga de devocionales** que combina:
- **Build-time data** (Gatsby GraphQL) - Datos rápidos del build
- **Runtime fetching** (Contentful API) - Actualizaciones automáticas sin rebuild
- **Cache local** (Capacitor Preferences) - Funcionalidad offline

## ✨ Nuevas Funcionalidades

### 1. **Carga Híbrida**
- La app primero muestra datos del build (instantáneo)
- Luego verifica Contentful API en background para contenido actualizado
- Si hay nuevo contenido, actualiza automáticamente

### 2. **Sincronización Automática**
- Al abrir la app detecta si hay conexión
- Si hay conexión, busca contenido nuevo automáticamente
- Guarda en cache para uso offline

### 3. **Sincronización Manual**
- Nuevo botón 🔄 en el header (solo visible en apps nativas)
- Permite forzar una sincronización inmediata
- Indicador visual cuando está sincronizando

### 4. **Indicadores de Estado**
- 🌐 Verde: Contenido actualizado desde API
- 📦 Naranja: Contenido desde cache local
- 🏗️ Gris: Contenido del build inicial

### 5. **Modo Offline Mejorado**
- Funciona sin conexión usando cache
- Muestra mensaje informativo cuando está offline
- Auto-sincroniza cuando la conexión se restaura

## 📁 Archivos Creados

### `/src/services/contentful-sync.js`
Servicio principal que maneja:
- Conexión con Contentful API
- Cache local con Capacitor Preferences
- Detección de red
- Estrategia de carga inteligente

### `/src/hooks/useDevotionals.js`
Hook de React que simplifica el uso del servicio:
- `useDevotionals()` - Para listas completas
- `useDevotionalByDate()` - Para devocional específico por fecha

## 🔧 Archivos Modificados

### `/src/pages/index.js`
- ✅ Implementada carga híbrida
- ✅ Agregado botón de sincronización manual
- ✅ Indicadores de fuente de datos
- ✅ Manejo mejorado de estados offline

### `/.env`
- ✅ Agregadas variables `GATSBY_CONTENTFUL_*` para runtime access

### `/src/locales/es/translation.json` y `/src/locales/en/translation.json`
- ✅ Agregadas traducciones para nuevos mensajes

## 🔑 Variables de Entorno

Las siguientes variables ya están configuradas en `.env`:

```env
# Build-time (servidor)
CONTENTFUL_SPACE_ID=kyqhj3vsed2t
CONTENTFUL_ACCESS_TOKEN=ESUBjIV47SfJE1IyJdagQqWyJXh7V3IFA8mBDLjjX68

# Runtime (cliente - navegador/app)
GATSBY_CONTENTFUL_SPACE_ID=kyqhj3vsed2t
GATSBY_CONTENTFUL_ACCESS_TOKEN=ESUBjIV47SfJE1IyJdagQqWyJXh7V3IFA8mBDLjjX68
```

⚠️ **Importante**: El token `CONTENTFUL_ACCESS_TOKEN` es el **Delivery API** (solo lectura), por lo que es seguro exponerlo en el cliente.

## 🧪 Cómo Probar

### En Desarrollo (Web)
```bash
npm run develop
```
- Abre http://localhost:8000
- Verás logs en la consola del navegador mostrando el proceso de sincronización

### En la App (Android/iOS)

1. **Build para móvil:**
```bash
npm run build:mobile
npx cap sync
```

2. **Abrir en Android Studio / Xcode:**
```bash
npx cap open android
# o
npx cap open ios
```

3. **Probar escenarios:**
   - ✅ Con internet: Debería cargar contenido fresco
   - ✅ Sin internet (modo avión): Debería usar cache
   - ✅ Subir nuevo audio a Contentful y sincronizar (botón 🔄)

## 📊 Flujo de Sincronización

```
┌─────────────────────────────────────────────────┐
│ Usuario abre la app                             │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ 1. Cargar datos del build (GraphQL)            │
│    ✅ Instantáneo - Usuario ve contenido       │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ 2. Verificar conexión a internet               │
└────────────┬────────────────────────────────────┘
             │
     ┌───────┴───────┐
     │               │
     ▼               ▼
┌──────────┐   ┌──────────────────┐
│  Online  │   │    Offline       │
└────┬─────┘   └─────┬────────────┘
     │               │
     ▼               ▼
┌─────────────┐ ┌─────────────────┐
│ 3. Fetch    │ │ 3. Cargar desde │
│ desde API   │ │ cache local     │
└────┬────────┘ └─────┬───────────┘
     │               │
     ▼               ▼
┌─────────────┐ ┌─────────────────┐
│ 4. Mostrar  │ │ 4. Mostrar      │
│ contenido   │ │ mensaje offline │
│ actualizado │ │                 │
└────┬────────┘ └─────────────────┘
     │
     ▼
┌─────────────┐
│ 5. Guardar  │
│ en cache    │
└─────────────┘
```

## 🎯 Beneficios Implementados

### ✅ Para Usuarios
- No necesitan actualizar la app cada vez que subes un nuevo audio
- Funciona sin internet usando cache
- Experiencia instantánea (no loading inicial)
- Auto-actualización transparente

### ✅ Para Ti
- No necesitas rebuild ni redeploy para nuevos audios
- Subes audio a Contentful → Usuarios lo ven automáticamente
- Reduces costos de builds en Codemagic
- Menos mantenimiento

### ✅ Técnicos
- Menor consumo de API de Contentful (cache inteligente)
- Cache de 12 horas (configurable)
- Background sync no bloqueante
- Fallbacks robustos

## 🔮 Próximos Pasos (Fase 2 - Opcional)

1. **Implementar en página de historial** (`/src/pages/historial.js`)
2. **Agregar background sync automático** (cada X horas)
3. **Implementar Edge Functions** para cache en CDN
4. **Analytics** para monitorear uso de cache vs API
5. **Precarga** de devocionales próximos (prefetching)

## 🐛 Debugging

### Ver logs en la consola:
```javascript
// En el navegador o app WebView
console.log('Ver logs de sincronización')
```

Busca estos emojis:
- 🌐 = Fetch desde Contentful API
- 📦 = Cargado desde cache
- ✅ = Operación exitosa
- ❌ = Error
- 🔄 = Sincronizando
- 📴 = Modo offline

### Limpiar cache manualmente (en consola del navegador):
```javascript
import { clearCache } from './src/services/contentful-sync';
clearCache();
```

## 📚 Uso del Servicio en Otros Componentes

Si quieres usar el servicio en otros lugares:

```javascript
import { useDevotionalByDate } from '../hooks/useDevotionals';

const MyComponent = () => {
  const { devotional, loading, source, isOnline } = useDevotionalByDate(
    new Date(),
    'es-MX'
  );
  
  return (
    <div>
      {loading ? 'Cargando...' : devotional.titulo}
      <span>Fuente: {source}</span>
    </div>
  );
};
```

## 🔐 Seguridad

- ✅ Token expuesto es **solo lectura** (Delivery API)
- ✅ No expone Management API
- ✅ Sin datos sensibles en el cliente
- ✅ Rate limiting manejado por Contentful

## 📞 Soporte

Si hay algún problema:
1. Verificar variables de entorno
2. Revisar logs en consola
3. Probar sincronización manual
4. Verificar que el Content Type en Contentful sea `devocional`

---

**Implementado:** Octubre 10, 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Producción Ready
