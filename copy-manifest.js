// copy-manifest.js
// Copia el manifest generado por Gatsby al archivo correcto según el idioma

const fs = require('fs');
const path = require('path');

const isEnglish = process.env.SITE_ENGLISH_BUILD === 'true';
const publicDir = path.join(__dirname, 'public');
const sourceManifest = path.join(publicDir, 'manifest.webmanifest');
const targetManifest = isEnglish
  ? path.join(publicDir, 'manifest-en.webmanifest')
  : path.join(publicDir, 'manifest-es.webmanifest');

if (!fs.existsSync(sourceManifest)) {
  console.error('No se encontró manifest.webmanifest en public/. ¿Ya corriste el build de Gatsby?');
  process.exit(1);
}

fs.copyFileSync(sourceManifest, targetManifest);
console.log(`Manifest copiado a ${targetManifest}`);
