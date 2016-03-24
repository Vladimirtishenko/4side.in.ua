var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
var config = require('../config/');
var responseResult = require('../middleware/responseResult').responseResult;

module.exports.post = function(req, res, next) {

   var transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: { user: 'vladimirtishenko1@gmail.com',
        pass: 'MEDS8placebo' }
  }));

  transporter.sendMail({
    from: 'support@4side.in.ua',
    to: "vladimirtishenko1@gmail.com",
    subject: 'Test sujet',
    text: "test text",
    html: "<b>Test text</b>"
  }, function (error, response) {
        responseResult(error, res);
  });

}
