// gatsby-node.js
// Este archivo se ejecuta durante el build y puede inyectar variables de entorno

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                // Inyectar variables de Firebase en el cliente
                'process.env.GATSBY_FIREBASE_API_KEY': JSON.stringify(process.env.GATSBY_FIREBASE_API_KEY),
                'process.env.GATSBY_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.GATSBY_FIREBASE_AUTH_DOMAIN),
                'process.env.GATSBY_FIREBASE_PROJECT_ID': JSON.stringify(process.env.GATSBY_FIREBASE_PROJECT_ID),
                'process.env.GATSBY_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.GATSBY_FIREBASE_STORAGE_BUCKET),
                'process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID),
                'process.env.GATSBY_FIREBASE_APP_ID': JSON.stringify(process.env.GATSBY_FIREBASE_APP_ID),
                'process.env.GATSBY_FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.GATSBY_FIREBASE_MEASUREMENT_ID),
            }),
        ],
    });
};
