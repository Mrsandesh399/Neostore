const proModel=require('../db/ProductsSchema')
const colModel=require("../db/ColorSchema")
const catModel=require("../db/Categoryschema")
const orderModel = require("../db/OrderSchema")

const addProduct=function(req,res){
    let pro =new proModel(req.body);
     pro.save((err,user)=>{
         if(err){
             res.json({err:"Error"})
         }
         else {
             res.json({msg:"product Added"})
         }
     })


}

const getProduct=function(req,res){
    proModel.find({},(err,data)=>{
        if(err){
            res.json({err:"error"})
        }
        else{
            res.send(data)
        }
    })
}

const productDetails=function(req,res){
    proModel.findById(req.params.id,(err,data)=>{
        if(err){
            res.json({err:"somthing went wrong"})
        }
        else{
            res.send(data)
        }

    })
}

const addColor=function(req,res){
    let col = new colModel(req.body);
    console.log(req.body)
    col.save((err,user)=>{
        if(err){
            res.json({err:"error"})
        }
        else{
            res.json({msg:"color added"})
        }
    })
}

const addCategory=function(req,res){
    let cat = new catModel(req.body);
    console.log(req.body);
    cat.save((err,user)=>{
        if (err){
            res.json({err:"error"})
        }
        else{
            res.json({msg:"category added"})
        }
    })
}

const getColor=function(req,res){
    colModel.findById({},(err,data)=>{
        if(err){
            res.json({err:"cant fetch any detail"})
        }
        else{
            res.send(data)
        }
    })
}

const getAllColor=function(req,res){
    colModel.find({},(err,data)=>{
        if(err){
            res.json({err:"cant fetch any detail"})
        }
        else{
            res.send(data)
        }
    })
}

const getAllCategory=function(req,res){
    catModel.find({},(err,data)=>{
        if(err){
            res.json({err:"cant fetch any detail"})
        }
        else{
            res.send(data)
        }
    })
}

const addOrder = function (req, res) {
    console.log(req.body);
    let data = {
        cart: req.body.cart1,
        address: req.body.selected,
        cardnumber: req.body.values.card,
        total: req.body.total,
        gst: req.body.gst,
        subtotal: req.body.subtotal,
        email: req.body.email,
    };
    let ins = new orderModel(data);
    ins.save((err) => {
        if (err) {
            res.json({ flag: 0, message: err.message });
        } else {
            res.json({ flag: 1, message: "Order Added" });
        }
    });
};

const getOrderDetails = function (req,res){
    orderModel.find({email:req.params.email},(err,data)=>{
        if(err){
            res.json({err:"cant fetch details"})
        }
        else{
            res.json(data)
        }
    })
}









module.exports ={addProduct,getProduct,productDetails,addColor,addCategory,getColor,getAllCategory, getAllColor,getOrderDetails,addOrder}