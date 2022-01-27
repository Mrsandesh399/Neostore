const customermodel= require('../db/UsersSchema')
const bcrypt= require('bcrypt');
const saltRounds=10;
const {sendmail}= require("../Middleware/mailer");
const orderModel = require('../db/OrderSchema');


let checkemail;
let checkotpforpassword;

//sending mail of forget password otp
const emailSend = function (req,res){
    let otpcode = Math.floor((Math.random()*100000)+1);
    checkotpforpassword = otpcode;
    console.log("otp passed",req.body.email);
    checkemail =req.body.email;
    let data = customermodel.findOne({email:req.body.eamil});
    if (data){
        sendmail(otpcode,req.body.email)
        res.json({"msg":`Email send successfully ${otpcode}`})
    }
    else{
        res.json({"err":"email id does not exist "});
    }
}

// verifying otp
const verifyOtp = function (req,res){
    console.log("Verify",req.body);
    if (req.body.otp == checkotpforpassword) {
        res.json({"msg":"OTP is correct"});
    } else {
        res.json({"err":"OTP incorrect"});
    }
}

//change password
const changePassword = function (req, res){
    console.log("FORGOT", checkemail);
    const password = req.body.password;
    //const hashPassword = bcrypt.hashSync(password, saltRounds);
    customermodel.updateOne(
        { email: checkemail },
        { $set: { password: password } },
        (err) => {
            if (err) {
                res.send({ flag: 0, message: "Error!!" });
            } else {
                res.send({ flag: 1, message: "Password Updated" });
            }
        }
    );
};

const newPassword = function (req,res){
    
    console.log("change",req.params.email);
    customermodel.findOne({email:req.params.email},(err,data)=>{
        if(data){
            const oldpassword = req.body.oldRef;
            
           // const match = bcrypt.compareSync(oldpassword,data.password);
            if(oldpassword===data.password){

                const password = req.body.values.password;
                console.log(password)
                //const hashPassword= bcrypt.hashSync(password,saltRounds);
                customermodel.updateOne(
                    {email:data.email},
                    {$set : {password : password}},
                    (err)=>{
                        if(err){
                            res.json({flag:0,message:err.message})
                        }else {
                            res.json({flag:1,message:"Password Changed"});
                        }
                    }
                );
            }
            else{
                res.json({err:0,message:"old password not matched"})
            }

        }
    });
};

const addAddress = function (req, res) {
    console.log("add", req.body);
    console.log("add", req.params.email);
    let address = {
        address: req.body.values.address,
        pincode: req.body.values.pincode,
        city: req.body.values.city,
        state: req.body.values.state,
        country: req.body.values.country,
    };
    customermodel.findOneAndUpdate(
        { email: req.params.email },
        { $push: { addresses: address } },
        (err) => {
            if (err) {
                res.json({ flag: 0, message: err.message });
            } else {
                res.json({ flag: 1, message: "Address Added" });
            }
        }
    );
}


const getUser = function (req, res) {
    console.log(req.params.email);
    customermodel.findOne({ email: req.params.email }, (err, data) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json(data);
        }
    });
};

const addCart= function (req,res){
    customermodel.updateOne(
        {email : req.params.email},
        {$set :{cart:req.body.cart}},
        (err)=>{
            if(err){
                res.json({msg:0,message:err.message});
            }
            else
            {
                res.json({msg:1,message:"Address Added"})
            }
        }
    )
}

const getInvoice = function (req,res){
    orderModel.findById(req.params.id,(err,data)=>{
        if(err){
            res.json({"msg":"error"})
        }
        else{
            res.json(data);
        }
    })
}




module.exports = {
    emailSend, verifyOtp, changePassword,addAddress,getUser,addCart,getInvoice,newPassword
}
