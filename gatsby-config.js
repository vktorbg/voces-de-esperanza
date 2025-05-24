require("dotenv").config()

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Voces de Esperanza`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-google-spreadsheet`,
      options: {
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        worksheetTitle: `Hoja1`, // o el nombre de tu pestaña
        credentials: require("./google-credentials.json"),
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
  ],
}
