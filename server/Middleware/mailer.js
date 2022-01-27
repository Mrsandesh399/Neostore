const nodemailer = require("nodemailer");


function sendmail(otpcode,email){
    let mailTransporter = nodemailer.createTransport({
        service:"gmail",
        port:587,
        secure:false,
        auth:{
            user : "anushaneedesh@gmail.com",
            pass :"Aans@23828",
        },
    });

    let mailDetails = {
        from:"anushaneedesh@gmail.com",
        to: `${email}`,

        subject:"OTP verification for NeoSTORE",
        html:
                "<h3>OTP for password change is </h3>"+
                "<h1 style='font-weight:bold;'>"+ otpcode +"<h1/>",
    
          text:`YOUR OTP IS ${otpcode}`,
};

mailTransporter.sendMail(mailDetails,function(err,data){
    if(err) {
        return console.log(err);
    }
    console.log("Message sent: %s",info.messageId);
    console.log(
        "preview URL : %s",
        nodemailer.getTestMessageUrl(data)

    );
});
}

module.exports = {sendmail}