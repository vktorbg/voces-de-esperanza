// src/api/get-videos.js

const WEB_APP_URL = process.env.GOOGLE_SCRIPT_WEB_APP_URL;

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
    const videos = data.videos || [];
    
    // The script should already return data, but we can sort here just in case
    const sortedVideos = videos.sort((a, b) => Number(a.orden) - Number(b.orden));

    res.status(200).json(sortedVideos);

  } catch (error) {
    console.error("Error en API get-videos:", error);
    res.status(500).json({ error: error.message });
  }
}