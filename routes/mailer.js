var nodemailer = require('nodemailer');

var mail = (function(){

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'stormspot6170@gmail.com',
      pass: 'project3'
    }
  });

  var sendMail = function(to, subject, text){

    var mailOptions = {
      from: "stormspot6170@gmail.com",
      to: to,
      subject: subject,
      text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  }

  return sendMail;
})();

module.exports.mail = mail;