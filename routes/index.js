const createPay  = require('../helpers/paypal');
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Paypal',
      message: 'Welcome !'
    });
  });

  // start payment process

  app.get('/buy', (req, res) => {
    // create payment object
    const payment = {
      'intent': 'authorize',
      'payer': {
        'payment_method': 'paypal'
      },
      'redirect_urls': {
        'return_url': "http://127.0.0.1:3000/success",
        'cancel_url': "http://127.0.0.1:3000/error"
      },
      'transactions': [{
        'amount': {
          'total': 39.00,
          'currency': 'USD'
        },
        'description': 'a book on mean stack'
      }]
    };

    // call the create Pay method
    createPay(payment)
      .then((transaction) => {
        console.log(transaction);
        const id = transaction.id;
        const links = transaction.links;
        let counter = links.length;
        while (counter--) {
          if (links[counter].method === 'REDIRECT') {
          // redirect to paypal where user approves the transaction;
            return res.redirect(links[counter].href);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/error');
      });
  });

  // success page
  app.get('/success', (req, res) => {
    console.log(req.query);
    res.render('succces', {
      title: 'Paypal',
      message: 'Payment was succesfull'
    });
  });

  // error page
  app.get('/error', (req, res) => {
    console.log(req.query);
    res.render('error', {
      title: 'Paypal',
      message: 'Payment was not succeseed'
    });
  });
};
