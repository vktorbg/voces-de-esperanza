const { sendDailyDevotional } = require('./src/sendDailyDevotional');
const { sendVideoNotification } = require('./src/sendVideoNotification');
const { testNotification } = require('./src/testNotification');

exports.sendDailyDevotional = sendDailyDevotional;
exports.sendVideoNotification = sendVideoNotification;
exports.subscribeToTopic = require('./src/subscribeToTopic').subscribeToTopic;
exports.unsubscribeFromTopic = require('./src/unsubscribeFromTopic').unsubscribeFromTopic;
exports.testNotification = testNotification;
