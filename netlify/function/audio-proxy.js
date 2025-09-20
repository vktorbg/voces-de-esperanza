// File: netlify/functions/audio-proxy.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Obtenemos la URL del audio de Contentful desde los parámetros de la solicitud
  const { url } = event.queryStringParameters;

  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing "url" query parameter',
    };
  }

  try {
    // Hacemos la petición al servidor de Contentful para obtener el audio
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer' // Importante para archivos binarios como el audio
    });

    // Devolvemos el audio a nuestra app, añadiendo las cabeceras CORS
    return {
      statusCode: 200,
      headers: {
        // ¡Aquí está la magia! Permitimos el acceso desde cualquier origen
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': response.headers['content-type'], // Mantenemos el tipo de archivo original
        'Content-Length': response.headers['content-length'],
      },
      // Devolvemos los datos del audio en base64
      body: Buffer.from(response.data, 'binary').toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error fetching the audio file:', error);
    return {
      statusCode: 500,
      body: 'Error fetching the audio file.',
    };
  }
};