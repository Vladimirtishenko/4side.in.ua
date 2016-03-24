var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
var config = require('../config/');

module.exports.post = function(req, res, next) {

   var transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: { user: 'vladimirtishenko1@gmail.com',
        pass: 'MEDS8placebo' }
  }));

  transporter.sendMail({
    from: 'Contact <support@4side.in.ua>',
    to: "vladimirtishenko1@gmail.com",
    subject: 'Test sujet',
    text: "test text",
    html: "<b>Test text</b>"
  }, function (error, response) {
    //Email not sent
    if (error) {
        console.log(error)
      res.json("Email send Falied");
    }
    //email send sucessfully
    else {
      console.log(response);
      res.json("sucess");
    }
  });

}
