# Voces de Esperanza — CLAUDE.md

## Descripción del proyecto

App web/móvil cristiana bilingüe (español/inglés) para sermones, recursos y contenido de audio. Construida con **Gatsby**, desplegada en **Netlify** (web) y distribuida como app nativa en Android/iOS vía **Capacitor**.

- Sitio español: `voces-de-esperanza.com`
- Sitio inglés: `voices-of-hope.com` (build con `SITE_ENGLISH_BUILD=true`)

## Stack tecnológico

- **Framework:** Gatsby (React, SSG)
- **Estilos:** Tailwind CSS + PostCSS
- **CMS:** Contentful (gatsby-source-contentful)
- **Backend/DB:** Firebase (Firestore, Functions)
- **Móvil:** Capacitor (Android & iOS)
- **Push notifications:** Firebase Cloud Messaging (@capacitor-community/fcm)
- **Deploy web:** Netlify
- **Deploy móvil:** Codemagic CI/CD

## Estructura del proyecto

```
src/
  components/     # AudioPlayer, Layout, PageHeader, Seo, LanguageProvider, hooks/
  pages/          # index, videos, recursos, historial, ajustes, upload, quienes-somos, llamado-accion
  services/       # firebase.js, contentful-sync.js, contentful-management.js
  locales/        # Traducciones i18n
  styles/
  utils/
functions/        # Firebase Cloud Functions
android/          # Proyecto Android (Capacitor)
ios/              # Proyecto iOS (Capacitor)
```

## Comandos clave

```bash
npm run develop        # Desarrollo local (gatsby develop)
npm run build          # Build producción web
npm run build:mobile   # Build para móvil (con prefix-paths)
npm run clean          # Limpiar caché Gatsby
```

## Variables de entorno necesarias

```
CONTENTFUL_SPACE_ID
CONTENTFUL_ACCESS_TOKEN
SITE_ENGLISH_BUILD=true   # Para build en inglés (Voices of Hope)
```

## Convenciones

- Las páginas están en español por defecto; el idioma se gestiona con `LanguageProvider`
- El build de inglés se controla con la variable `SITE_ENGLISH_BUILD`
- Contentful es la fuente de verdad para el contenido (sermones, recursos, audio)
- Firebase se usa para datos dinámicos (historial, preferencias, notificaciones)
- El App ID de Capacitor es `com.vocesdeesperanza.app`

## Deploy

- **Web:** Push a `master` → Netlify auto-deploy
- **Móvil:** Codemagic build (`codemagic.yaml`) para generar APK/IPA
