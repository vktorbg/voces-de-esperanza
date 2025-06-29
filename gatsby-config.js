// gatsby-config.js

require("dotenv").config();

// Ya no necesitamos las credenciales aquí, se usarán en las API functions
// const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Voces de Esperanza`,
    siteUrl: `https://www.voces-de-esperanza.com`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    // --- IMPORTANTE ---
    // Se han ELIMINADO los plugins 'gatsby-source-google-spreadsheet'
    // porque ahora obtenemos los datos de forma dinámica con API Functions.
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Devocionales`,
        short_name: `Devocionales`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4b5563`,
        display: `standalone`,
        icon: `src/images/icon.jpg`,
      },
    },
    `gatsby-plugin-offline`,
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
        resolveSiteUrl: ({ site }) => {
          return site.siteMetadata.siteUrl;
        },
        excludes: [
          `/dev-404-page/`,
          `/404/`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback/`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-45L02H1E57",
        ],
        respectDNT: true,
        exclude: ["/preview/**", "/do-not-track/"],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
};