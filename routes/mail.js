var nodemailer = require('nodemailer');

module.exports.post = function(req, res, next) {
    console.log(req.body);


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vladimirtishenko1@gmail.com',
            pass: 'MEDS8placebo'
        }
    });

    var text = 'Hello world from \n\n' + req.body.number;

    var mailOptions = {
        from: 'vladimirtishenko1@gmail.com', // sender address
        to: 'vladimirtishenko1@gmail.com', // list of receivers
        subject: 'Email Example', // Subject line
        text: text //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };


    transporter.sendMail(mailOptions, function(error, info) {
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
