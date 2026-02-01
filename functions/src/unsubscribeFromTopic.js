const functions = require('firebase-functions');
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp();
}

exports.unsubscribeFromTopic = functions.https.onCall(async (data, context) => {
    const { token, topic } = data;

    if (!token || !topic) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with "token" and "topic" arguments.');
    }

    try {
        const response = await admin.messaging().unsubscribeFromTopic(token, topic);
        console.log(`Successfully unsubscribed ${token} from topic: ${topic}`, response);
        return { success: true, message: `Unsubscribed from ${topic}` };
    } catch (error) {
        console.error(`Error unsubscribing from topic ${topic}:`, error);
        throw new functions.https.HttpsError('internal', 'Error unsubscribing from topic', error);
    }
});
