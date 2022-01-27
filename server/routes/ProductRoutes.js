const express= require("express")
const router =express.Router();
const {addProduct, getProduct, productDetails, addColor, addCategory,getColor,getAllCategory, getAllColor,addOrder,getOrderDetails}=require("../config/ProductController")



router.post("/adding-pro",addProduct);
router.get("/getting-pro",getProduct);
router.get("/product-details/:id",productDetails);

router.post("/adding-col",addColor);
router.post("/adding-cat",addCategory);

router.get("/col/:id",getColor)
router.get("/col-all",getAllColor)
router.get("/cat-all",getAllCategory)

router.post("/get-order",addOrder);
router.get("/get-orderdetail/:email",getOrderDetails);



module.exports=router;