var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* Sends new email. */
router.post('/', function(req, res) {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'matt.condit4@gmail.com',
            pass: 'eagles04'
        }
    });



    var emailForClient = '<p>Hello, Thanks for reaching out. </p><p> I\'ll get back to you as soon as possible.</p><p> Best Regards,</p><p>Matt Condit</p>';


    var mailOptionsToClient = {
        from: 'matt.condit4@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Thanks, ' + req.body.name + ' for Reaching out', // Subject line
        html: emailForClient //, // plaintext body
    };
    var mailOptionsToMatt = {
        from: 'matt.condit4@gmail.com', // sender address
        to: 'matt.condit4@gmail.com', // list of receivers
        subject: 'Hey Matt, You have a new Inquiry from ' + req.body.name,  // Subject line
        html: 'To Respond, click here:  <a href="mailto:' +req.body.email +'">'+req.body.email +'</a>'+ req.body.description  // plaintext body
    };

    transporter.sendMail(mailOptionsToMatt, function(error, info){
       console.log(error);
    });
    var errorBool = false;
    transporter.sendMail(mailOptionsToClient, function(error, info){
        if(error) {
            console.log(error);
            var errorBool = true;
        }

    });
    res.redirect('/');
});

module.exports = router;
