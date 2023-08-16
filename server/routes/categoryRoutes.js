import express from "express";

import {requireSignIn, isAdmin} from "../middlewares/authMiddlewares.js"
import { createCategoryController ,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController} from "../controllers/categoryController.js";



const router=express.Router();

router.post('/create-category',requireSignIn,isAdmin, createCategoryController)

//update category

router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)

//get all category

router.get("/getall-category",categoryController)

// get single category

router.get("/single-category/:slug", singleCategoryController);


router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)


export default router;