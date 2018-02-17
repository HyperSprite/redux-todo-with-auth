const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_KEY,
  apiSecret: process.env.NEXMO_SECRET,
});
const APIlog = require('../models/apilogs');
const hlpr = require('../lib/helpers');

exports.sendText = (txtNumber, txtMessage) => {
  /** nexmo is production only, !production, just log it */
  if (process.env.NODE_ENV === 'production') {
    nexmo.message.sendSms(
      process.env.NEXMO_VIRTUAL_NUMBER, txtNumber, txtMessage,
      (err, responseData) => {
        if (err) {
          hlpr.logOutArgs('services/nexmo.sendText', 'sms', 'error', 3, err, 'sms_message', txtMessage, txtNumber);
        } else {
          responseData.messages.forEach((m) => {
            const newLog = new APIlog({
              logType: 'nexmo',
              logSubType: 'sendText',
              remainingBalance: m['remaining-balance'] * 1,
              messagePrice: m['message-price'] * 1,
              to: m.to,
              status: m.status,
              network: m.network,
            });
            newLog.save();
          });
          hlpr.logOutArgs('services/nexmo.sendText', 'sms', 'sucsess', 5, err, 'sms_message', responseData, txtNumber);
        }
      },
    );
  } else {
    const newLog = new APIlog({
      logType: 'nexmo',
      logSubType: 'sendText test',
      remainingBalance: 11.0000,
      messagePrice: 0.005,
      to: txtNumber,
      status: `NODE_ENV: ${process.env.NODE_ENV}, txtMessage: ${txtMessage}`,
    });
    newLog.save();
    hlpr.logOutArgs('services/nexmo.sendText nonProd', 'sms', 'sucsess', 5, null, 'sms_message', txtMessage, txtNumber);
  }
};
