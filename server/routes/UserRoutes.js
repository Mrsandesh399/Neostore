const express = require("express");
const { verifyOtp,emailSend,changePassword, addAddress, getUser, addCart, getInvoice,newPassword } = require("../config/UserController");
const routes = express.Router();




routes.post('/verify-otp',verifyOtp);
routes.post('/email-send',emailSend);
routes.post('/change-password', changePassword);
routes.post('/add-address/:email', addAddress);
routes.get("/get-user/:email", getUser)
routes.post('/add-cart', addCart);
routes.get("/get-invoice/:id",getInvoice)
routes.post("/new-password/:email", newPassword)






module.exports=routes;

