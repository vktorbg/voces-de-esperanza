// gatsby-config.js

require("dotenv").config();

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

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
        // output: `/sitemap.xml`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-45L02H1E57", // Reemplaza esto con tu ID real de GA4
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