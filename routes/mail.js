var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
var config = require('../config/');
var responseResult = require('../middleware/responseResult').responseResult;

module.exports.post = function(req, res, next) {

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: '4side.developer@gmail.com',
            pass: '4side4side'
        }
    }));

    transporter.sendMail({
        from: 'support@4side.in.ua',
        to: "4side.developer@gmail.com",
        subject: 'New Message from 4side',
        text: "Name client: "+req.body.name+"\r\n Number client: "+req.body.number+"\r\n Email client: "+req.body.email+"\r\n Company client: "+req.body.company+"\r\n Description of Project: "+req.body.description
    }, function(error, response) {
        responseResult(error, res);
    });

}