# Documentación: Llamado a la Acción

## Descripción

Funcionalidad de videos semanales "Llamado a la Acción" que conecta los temas devocionales de la semana con acciones concretas.

## Características

### 1. Página dedicada `/llamado-accion`
- Galería de todos los videos semanales
- Grid responsivo (1 columna móvil, 2 tablet, 3 desktop)
- Ordenados por fecha de publicación (más reciente primero)
- Link al canal de YouTube

### 2. Integración en devocionales del sábado
- Video embebido automáticamente al final del devocional
- Solo se muestra en devocionales del sábado
- Player de YouTube con aspect ratio 16:9
- Link "Ver todos los videos semanales" → `/llamado-accion`

## Cómo Subir un Nuevo Video Semanal

### Paso 1: Subir a YouTube
1. Título sugerido: `"Llamado a la Acción - Semana del [Fecha]"`
2. Descripción: Incluir referencia al tema de la semana
3. Thumbnail: Branding consistente
4. Visibilidad: Público
5. Copia el **Video ID** de la URL (ej: en `https://youtube.com/watch?v=dQw4w9WgXcQ` el ID es `dQw4w9WgXcQ`)

### Paso 2: Agregar a Contentful
1. Ve a **Content → Videos → Add Entry**
2. Llena los campos:
   - **Title**: Mismo que YouTube
   - **Video ID**: El ID copiado de YouTube
   - **Video Type**: Selecciona `"Llamado a la acción"` ← **¡IMPORTANTE!**
   - **Publication Date**: La fecha del sábado correspondiente (formato: YYYY-MM-DD)
   - **Is Recommended**: No (dejar sin marcar)
3. Click **Save** y luego **Publish**

### Paso 3: Trigger Build
El sitio se construye estáticamente, así que necesitas:
- Opción A: Esperar al siguiente build automático programado
- Opción B: Trigger manual del build en tu plataforma de hosting
- Opción C: Localmente: `npm run build`

### Paso 4: Verificar
1. Visita `/llamado-accion` → El nuevo video debe aparecer primero
2. Navega al devocional del sábado correspondiente → El video debe estar embebido al final

## Matching de Videos con Devocionales

El sistema usa una lógica de matching inteligente:

1. **Exact match**: Si hay un video con `publicationDate` igual a la `fecha` del devocional del sábado
2. **Fallback**: Si no hay match exacto, usa el video más reciente

Esto asegura que siempre haya un video visible incluso si las fechas no coinciden exactamente.

## Archivos Modificados/Creados

### Archivos Creados
- `src/pages/llamado-accion.js` - Nueva página de galería
- `static/banner-llamado-accion.jpg` - Banner (placeholder temporal, **reemplazar con diseño personalizado**)
- `LLAMADO_A_LA_ACCION.md` - Esta documentación

### Archivos Modificados
- `src/pages/index.js` - Integración del video embebido en sábados
- `src/locales/es/translation.json` - Traducciones en español
- `src/locales/en/translation.json` - Traducciones en inglés

## Configuración de Contentful

### Content Type: `video`
Campo **videoType** configurado con validación:
- "Short"
- "Video Largo"
- "Llamado a la acción"

Para videos de "Llamado a la Acción", **SIEMPRE** selecciona `"Llamado a la acción"` en este campo.

## Personalización del Banner

El banner actual (`static/banner-llamado-accion.jpg`) es temporal (copia de `banner-videos.jpg`).

### Especificaciones recomendadas:
- **Dimensiones**: 1200x400px
- **Formato**: JPG optimizado (~50-100KB)
- **Tema**: Acción, transformación, llamado
- **Colores**: Tonos cálidos (naranja, rojo, dorado) para reflejar el "fuego" del emoji 🔥
- **Contenido**: Imagery inspiracional (persona en acción, manos levantadas, amanecer, etc.)
- **Texto**: No incluir texto (se agrega via código)

## Troubleshooting

### El video no aparece en `/llamado-accion`
- ✅ Verifica que `videoType` sea exactamente `"Llamado a la acción"` en Contentful
- ✅ Confirma que el video esté publicado (no draft)
- ✅ Haz rebuild del sitio
- ✅ Clear caché del browser

### El video no se embebe en el devocional del sábado
- ✅ Verifica que el devocional sea de un sábado (campo `date` en formato YYYY-MM-DD)
- ✅ Confirma que `publicationDate` del video coincida con la fecha del devocional
- ✅ Revisa la consola del browser para errores

### Thumbnail de YouTube no carga
- ✅ Verifica que el `videoId` sea correcto
- ✅ Confirma que el video esté público en YouTube
- ✅ Espera unos minutos (YouTube puede tardar en generar thumbnails)

### Error en GraphQL query
```
Field "allContentfulVideo" is not defined by type Query
```
- Significa que no hay videos en Contentful aún
- Crea al menos un video de prueba
- Haz rebuild

## Mejoras Futuras (Opcional)

### Fase 2
- Runtime video fetching (sin rebuild requerido)
- Búsqueda/filtro de videos
- Agrupación por mes/trimestre

### Fase 3
- Notificaciones push los sábados
- Analytics de engagement
- Subtítulos multi-idioma

### Fase 4
- Tracker de acciones completadas
- Comentarios/reflexiones de usuarios
- Compartir acciones en redes sociales

## Soporte

Para preguntas o problemas:
- Revisa esta documentación
- Consulta el plan detallado en: `.claude/plans/toasty-chasing-whisper.md`
- Revisa los archivos de código mencionados arriba

---

**Última actualización**: Diciembre 2025
**Versión**: 1.0
