import express from "express";
import { requireSignIn,isAdmin } from "../middlewares/authMiddlewares.js";
import { createProductController, getproductController , getSingleProductController,productPhotoController,deleteProductController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController} from "../controllers/productController.js";

import formidable from "express-formidable";


const router=express.Router();


//routes

router.post("/create-product",requireSignIn,isAdmin, formidable(),createProductController)


router.get("/get-products",getproductController)

router.get("/get-product/:slug", getSingleProductController)

router.get("/product-photo/:pid", productPhotoController)


router.delete("/delete-product/:pid",deleteProductController)



router.put("/update-product/:pid",requireSignIn,isAdmin, formidable(),updateProductController)

//filter products 

router.post('/product-filters',productFilterController);

//product count

router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page', productListController);

router.get('/search/:keyword',searchProductController);

//similar products 
router.get('/related-product/:pid/:cid', relatedProductController)

//category product

router.get('/product-category/:slug',productCategoryController)

//payment route

router.get('/braintree/token',braintreeTokenController);

router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router;
