const { sendDailyDevotional } = require('./src/sendDailyDevotional');
const { sendVideoNotification } = require('./src/sendVideoNotification');

exports.sendDailyDevotional = sendDailyDevotional;
exports.sendVideoNotification = sendVideoNotification;
exports.subscribeToTopic = require('./src/subscribeToTopic').subscribeToTopic;
exports.unsubscribeFromTopic = require('./src/unsubscribeFromTopic').unsubscribeFromTopic;
