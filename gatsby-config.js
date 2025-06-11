// gatsby-config.js

require("dotenv").config();

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  // --- INICIO: CAMBIO 1 ---
  
  siteMetadata: {
    title: `Voces de Esperanza`,
    siteUrl: `https://www.voces-de-esperanza.com`, // <--- ¡IMPORTANTE: ACTUALIZA ESTA LÍNEA!
  },
  // --- FIN: CAMBIO 1 ---
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-google-spreadsheet`,
      options: {
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        worksheetTitle: `Hoja1`,
        credentials,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Devocionales`,
        short_name: `Devocionales`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4b5563`, // gris neutro
        display: `standalone`,
        icon: `src/images/icon.jpg`, // crea este ícono
      },
    },
    `gatsby-plugin-offline`,
    // --- INICIO: CAMBIO 2 ---
    // Añadiendo el plugin gatsby-plugin-sitemap
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        // La función resolveSiteUrl le dice al plugin cómo obtener la URL de tu sitio.
        // Asume que la tienes definida en siteMetadata.siteUrl.
        resolveSiteUrl: ({ site, allSitePage }) => {
          return site.siteMetadata.siteUrl;
        },
        // Aquí puedes excluir páginas que no quieres que aparezcan en el sitemap.
        // Las páginas de error y desarrollo ya vienen por defecto.
        excludes: [
          `/dev-404-page/`,
          `/404/`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback/`,
          // Si tienes otras rutas que no quieres en el sitemap (ej. /admin, /gracias), añádelas aquí:
          // `/ruta-a-excluir/`,
        ],
        // Opcional: Para sitios muy grandes, puedes generar sitemaps más pequeños.
        // Este plugin lo maneja automáticamente con un sitemap de índice.
        // output: `/sitemap.xml`, // Esto es el valor por defecto y funciona bien
      },
    },
    // --- FIN: CAMBIO 2 ---
  ],
};