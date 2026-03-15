const functions = require('firebase-functions');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Función de prueba para enviar una notificación inmediata a un token FCM específico.
 * Llamar desde Firebase Console o desde la app para verificar que el sistema funciona.
 *
 * Parámetros:
 *   - token: string (FCM device token)
 *   - title: string (título de la notificación, opcional)
 *   - body: string (cuerpo de la notificación, opcional)
 */
exports.testNotification = functions
  .region('us-central1')
  .https
  .onCall(async (data, context) => {
    const { token, title, body } = data;

    if (!token) {
      throw new functions.https.HttpsError('invalid-argument', 'Se requiere el campo "token".');
    }

    const message = {
      token: token,
      notification: {
        title: title || '🔔 Prueba de Notificación',
        body: body || 'Las notificaciones están funcionando correctamente.',
      },
      android: {
        priority: 'high',
        notification: {
          channelId: 'devotional_notifications',
          sound: 'default',
          icon: 'ic_launcher',
        },
      },
      apns: {
        headers: { 'apns-priority': '10' },
        payload: { aps: { sound: 'default', badge: 1 } },
      },
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Test notification sent:', response);
      return { success: true, messageId: response };
    } catch (error) {
      console.error('Error sending test notification:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  });
