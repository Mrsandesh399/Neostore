const express = require('express');
const router = express.Router();
const signupmodel= require("../db/UsersSchema");
const jwt = require("jsonwebtoken")
const jwtSecret = "lkdjhfuhfuhuebysuirndb"
const bcrypt = require('bcrypt')


//for Regisration

router.post('/signup',(req,res)=>{
    let firstname= req.body.firstname;
    let lastname= req.body.lastname;
    let email=req.body.email;
    let password=req.body.password;
    let contact= req.body.contact;
   // const passwordhash= bcrypt.hash(password,10)

    let ins= new signupmodel({email:email,password:password,contact:contact,firstname:firstname,lastname:lastname})
    console.log(ins);
    ins.save((err)=>{
        if(err){
            res.json({"err":1,"msg":err}
            )
        }
        else{
            res.json({"err":0,"msg":"Registerd"})
        }
    })
})



//for login page
router.post("/login",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    signupmodel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,'msg':"Invalid email or password"})
        }
        else if(data== null){
            res.json({"err":1,'msg':'Fill all the field'})
        }
        else{
            let payload={
                uid:email
            }
             const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,'msg':'Login success',"token":token})

        }
       
    })
});

module.exports= router;