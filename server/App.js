const express = require("express")
const PORT = 7777;
const app = express();
const mongoose = require("mongoose");
const cors= require('cors')


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const db="mongodb://localhost:27017/ecommerce";

const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true})
        console.log("mongodb connected")
    }
    catch(err){
        console.log(err.message);
    }
}

connectDB();

const postRoutes=require('./routes/PostRoutes');
app.use("/api/posts",postRoutes)

const userRoutes=require("./routes/UserRoutes")
app.use("/api/posts",userRoutes)

const productRoutes = require("./routes/ProductRoutes")
app.use("/api/products",productRoutes)

app.listen(PORT,()=>{
    console.log(`work on ${PORT}`)
})