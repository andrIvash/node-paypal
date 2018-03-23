const paypal = require('paypal-rest-sdk');
const config = require('../config/');

// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id': config().get('client_id'), // please provide your client id here
  'client_secret': config().get('client_secret') // provide your client secret here
});

module.exports = (payment) => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(payment, (err, payment) => {
      if (err) {
        reject(err);
      } else {
        resolve(payment);
      }
    });
  });
};
