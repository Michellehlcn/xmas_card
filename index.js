var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = function (path, callback){
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            callback(err);
        } 
        else {
            callback(null, html);
        }
    });
};
// 88d6d1eaaabebb081a6130ca808c5920
smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "michellehlcn.au@gmail.com",
        pass: "@a020659B",
    }
}));
smtpTransport.verify().then(console.log).catch(console.error);
readHTMLFile(__dirname + '/index.html', function(err, html) {
    if(err) {
        console.log('error reading file', err);
        return;
    }
    var template = handlebars.compile(html);
    var replacements = {
        username: "michelle"
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
        from: 'michellehlcn.au@gmail.com',
        to: 'michellehlcn.au@gmail.com',
        subject: 'test subject',
        html: htmlToSend
    };
    smtpTransport.sendMail(mailOptions, function(err, res) {
        if (err) {
            console.log(err);
        }
    });
});