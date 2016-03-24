var nodemailer = require('nodemailer');
var config = require('../config/');

module.exports.post = function(req, res, next) {

    var transport = nodemailer.createTransport("SMTP", {
        host: config.get('mail:host'), 
        secureConnection: true, 
        port: config.get('mail:port'), 
        auth: {
            user: config.get('mail:username'),
            pass: config.get('mail:pass')
        }
    });

    var text = 'Hello world from \n\n';

    var mailOptions = {
        from: config.get('mail:username'), // sender address
        to: config.get('mail:username'), // list of receivers
        subject: 'Email Example', // Subject line
        text: text //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };


    transport.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.json({
                status: 500,
                massage: error
            });
        } else {
            console.log('Message sent: ' + info.response);
            res.json({
                status: 200
            });
        };
    });


}
