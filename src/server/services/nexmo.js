const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_KEY,
  apiSecret: process.env.NEXMO_SECRET,
});
const hlpr = require('../lib/helpers');

exports.sendText = (txtNumber, txtMessage) => {
  nexmo.message.sendSms(
    process.env.NEXMO_VIRTUAL_NUMBER, txtNumber, txtMessage,
      (err, responseData) => {
        if (err) {
          hlpr.logOutArgs('services/nexmo.sendText', 'sms', 'error', 3, err, 'sms_message', txtMessage, txtNumber);
        } else {
          hlpr.logOutArgs('services/nexmo.sendText', 'sms', 'sussess', 5, err, 'sms_message', responseData, txtNumber);
        }
      },
   );
};
