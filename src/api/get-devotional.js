// src/api/get-devotional.js

const WEB_APP_URL = process.env.GATSBY_GOOGLE_SCRIPT_WEB_APP_URL;

export default async function handler(req, res) {
  if (!WEB_APP_URL) {
    return res.status(500).json({ error: 'Google Script URL is not configured.' });
  }

  try {
    const response = await fetch(WEB_APP_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Script: ${response.statusText}`);
    }
    
    const data = await response.json();
    const allDevotionals = data.devotionals || [];

   // Código nuevo y corregido
const timeZone = 'America/Bogota'; // UTC-5 estable
const now = new Date();
const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const hoy = formatter.format(now);

    const devocional = allDevotionals.find(d => {
      if (!d.fecha) return false;
      // Handle potential Date objects from the script
      const dateString = new Date(d.fecha).toISOString().split('T')[0];
      return dateString === hoy;
    });

    if (devocional) {
      res.status(200).json(devocional);
    } else {
      res.status(404).json({ message: "No se encontró devocional para hoy." });
    }

  } catch (error) {
    console.error("Error en API get-devotional:", error);
    res.status(500).json({ error: error.message });
  }
}