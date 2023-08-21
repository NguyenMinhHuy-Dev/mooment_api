const router = require("express").Router();
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

router.post('/send', async (req, res, next) => { 
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:  process.env.NODEMAIL_USER,
            pass: process.env.NODEMAIL_PASS
        }
    })

    var mailOptions = {
        from: process.env.NODEMAIL_USER,
        to: 'nyhlovengan363@gmail.com',
        subject: 'Đơn hàng của bạn | Mooment Store',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/');
        }
    });  
});

module.exports = router;