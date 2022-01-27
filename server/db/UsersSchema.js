const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String},
    contact:{type:Number},
    addresses: {
        type: Array
    },
    cart:{
        type:Array
    },
    
},
{timestamps:true}
)

module.exports=mongoose.model("users",userSchema);