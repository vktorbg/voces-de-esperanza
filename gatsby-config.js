// gatsby-config.js

require("dotenv").config();

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
    
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Voces de Esperanza`,
        short_name: `Voces`, // Un nombre más corto para el ícono
        start_url: `/`,
        background_color: `#f3f4f6`, // Un gris claro para el splash screen
        theme_color: `#2563eb`,   // Un color azul para la barra de título del navegador
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
          // Excluimos las nuevas páginas de visor de PDF si las tienes
          `/recursos/manual-del-estudiante-react-pdf/`,
          `/recursos/manual-del-maestro-react-pdf/`,
          `/recursos/estudio-libertad-emocional-react-pdf/`,
          `/recursos/claves-consejeria-matrimonial-react-pdf/`,
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