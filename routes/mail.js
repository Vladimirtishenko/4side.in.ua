var nodemailer = require('nodemailer');
var config = require('../config/');

module.exports.post = function(req, res, next) {

    var smtpTransport = nodemailer.createTransport("SMTP",{
        host: config.get('mail:host'), 
        secureConnection: true, 
        port: config.get('mail:port'), 
        auth: {
            user: config.get('mail:username'),
            pass: config.get('mail:pass')
        }
    });

    var mail = {
        from: config.get('mail:username'),
        to: config.get('mail:username'),
        subject: "Send Email Using Node.js",
        text: "Node.js New world for me",
        html: "<b>Node.js New world for me</b>"
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });


}
