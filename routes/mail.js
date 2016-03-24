var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
var config = require('../config/');
var smtpTransport = nodemailer.createTransport(smtpTransport({
    host: config.get('mail:host'), 
    secureConnection: true, 
    port: config.get('mail:port'), 
    auth: {
        user: config.get('mail:username'),
        pass: config.get('mail:pass')
    }
}));

module.exports.post = function(req, res, next) {

   var mailOptions = {
        from : config.get('mail:username'),
        to : config.get('mail:username'),
        subject : "Your Subject",
        text : "Your Text",
        html : "HTML GENERATED"
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.json("error");
        }else{
            console.log(response.response.toString());
            console.log("Message sent: " + response.message);
            res.json("sent");
        }
    });

}
