const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.sendVideoNotification = functions
  .region('us-central1')
  .https
  .onCall(async (data, context) => {
    const { videoTitle, videoId, language } = data;

    if (!videoTitle || !videoId || !language) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing fields');
    }

    const topic = `new_videos_${language}`;
    const notification = language === 'es'
      ? { title: '🎥 Nuevo Video', body: videoTitle }
      : { title: '🎥 New Video', body: videoTitle };

    try {
      const response = await admin.messaging().send({
        notification: notification,
        data: { type: 'new_video', videoId: videoId, language: language },
        topic: topic,
      });
      return { success: true, messageId: response };
    } catch (error) {
      console.error('Error sending video notification:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  });
