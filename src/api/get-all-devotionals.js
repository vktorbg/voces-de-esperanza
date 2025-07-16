// File: voces-de-esperanza/src/api/get-all-devotionals.js

// Usamos la misma URL de la Web App de Google Script que ya funciona.
const WEB_APP_URL = process.env.GATSBY_GOOGLE_SCRIPT_WEB_APP_URL;

export default async function handler(req, res) {
  // 1. Verificamos que la URL esté configurada.
  if (!WEB_APP_URL) {
    console.error("La URL de Google Script no está configurada en las variables de entorno.");
    return res.status(500).json({ error: 'Google Script URL is not configured.' });
  }

  try {
    // Read the lang parameter from query
    const { lang } = req.query;
    
    // Construct URL with lang parameter
    const url = lang ? `${WEB_APP_URL}?lang=${lang}` : WEB_APP_URL;
    
    // 2. Hacemos la llamada fetch a la Web App, igual que en get-devotional.js
    const response = await fetch(url);
    if (!response.ok) {
      // Si la llamada falla, lanzamos un error.
      throw new Error(`Failed to fetch from Google Script: ${response.status} ${response.statusText}`);
    }
    
    // 3. Obtenemos el JSON completo.
    const data = await response.json();
    const allDevotionals = data.devotionals || [];

    // 4. Devolvemos TODOS los devocionales. No necesitamos filtrar nada aquí.
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=30');
    return res.status(200).json(allDevotionals);

  } catch (error) {
    console.error("Error en API get-all-devotionals:", error);
    return res.status(500).json({ error: error.message });
  }
}