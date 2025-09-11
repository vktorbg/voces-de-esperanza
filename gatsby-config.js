// gatsby-config.js

require("dotenv").config();

/**
 * @type {import('gatsby').GatsbyConfig}
 */
// Detectar si es build en inglés por variable de entorno
const isEnglish = process.env.SITE_ENGLISH_BUILD === 'true';

module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: isEnglish ? `Voices of Hope` : `Voces de Esperanza`,
    siteUrl: isEnglish ? `https://www.voices-of-hope.com` : `https://www.voces-de-esperanza.com`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: isEnglish ? `Voices of Hope` : `Voces de Esperanza`,
        short_name: isEnglish ? `VOH` : `VDE`,
        start_url: `/`,
        background_color: `#f3f4f6`,
        theme_color: `#2563eb`,
        display: `standalone`,
        icon: isEnglish ? `src/images/icon2.jpg` : `src/images/icon.jpg`,
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