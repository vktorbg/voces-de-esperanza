const functions = require('firebase-functions');
const admin = require('firebase-admin');
const contentful = require('contentful');

if (!admin.apps.length) {
  admin.initializeApp();
}

const contentfulClient = contentful.createClient({
  space: 'kyqhj3vsed2t',
  accessToken: functions.config().contentful.access_token,
});

async function fetchTodaysDevotional(locale) {
  try {
    const today = new Date().toLocaleString('en-US', {
      timeZone: 'America/Mexico_City',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const [month, day, year] = today.split('/');
    const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    console.log(`Fetching devotional for ${dateString}, locale: ${locale}`);

    const entries = await contentfulClient.getEntries({
      content_type: 'devotional',
      'fields.date': dateString,
      locale: locale,
      limit: 1,
    });

    if (entries.items.length === 0) {
      console.log(`No devotional found for ${dateString} in ${locale}`);
      return null;
    }

    const devotional = entries.items[0];
    return {
      title: devotional.fields.title || 'Devocional del Día',
      bibleVerse: devotional.fields.bibleVerse || '',
      date: dateString,
    };
  } catch (error) {
    console.error('Error fetching devotional:', error);
    return null;
  }
}

async function sendNotificationToTopic(topic, notification, data) {
  const message = {
    notification: notification,
    data: data,
    topic: topic,
    android: {
      priority: 'high',
      notification: {
        channelId: 'devotional_notifications',
        sound: 'default',
        icon: 'ic_notification',
        color: '#2563eb',
      },
    },
    apns: {
      headers: { 'apns-priority': '10' },
      payload: { aps: { sound: 'default', badge: 1 } },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log(`Message sent to ${topic}:`, response);
    return response;
  } catch (error) {
    console.error(`Error sending to ${topic}:`, error);
    throw error;
  }
}

exports.sendDailyDevotional = functions
  .region('us-central1')
  .pubsub
  .schedule('0 6 * * *')
  .timeZone('America/Mexico_City')
  .onRun(async (context) => {
    console.log('Starting daily devotional notification job...');

    try {
      // Spanish
      const devotionalEs = await fetchTodaysDevotional('es-MX');
      if (devotionalEs) {
        await sendNotificationToTopic(
          'daily_devotional_es',
          {
            title: '🙏 Devocional del Día',
            body: devotionalEs.bibleVerse || devotionalEs.title,
          },
          {
            type: 'daily_devotional',
            date: devotionalEs.date,
            language: 'es',
          }
        );
        console.log('Spanish notification sent');
      }

      // English
      const devotionalEn = await fetchTodaysDevotional('en-US');
      if (devotionalEn) {
        await sendNotificationToTopic(
          'daily_devotional_en',
          {
            title: '🙏 Daily Devotional',
            body: devotionalEn.bibleVerse || devotionalEn.title,
          },
          {
            type: 'daily_devotional',
            date: devotionalEn.date,
            language: 'en',
          }
        );
        console.log('English notification sent');
      }

      return null;
    } catch (error) {
      console.error('Error in daily devotional job:', error);
      throw error;
    }
  });
