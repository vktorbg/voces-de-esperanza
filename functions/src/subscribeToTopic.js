const functions = require('firebase-functions');
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp();
}

exports.subscribeToTopic = functions.https.onCall(async (data, context) => {
    const { token, topic } = data;

    if (!token || !topic) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with "token" and "topic" arguments.');
    }

    try {
        const response = await admin.messaging().subscribeToTopic(token, topic);
        console.log(`Successfully subscribed ${token} to topic: ${topic}`, response);
        return { success: true, message: `Subscribed to ${topic}` };
    } catch (error) {
        console.error(`Error subscribing to topic ${topic}:`, error);
        throw new functions.https.HttpsError('internal', 'Error subscribing to topic', error);
    }
});
