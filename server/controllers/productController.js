import slugify from "slugify";
import Product from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree"
import orderModel from "../models/orderModel.js";


// import formidable from "express-formidable";
import dotenv from "dotenv"

import fs from "fs";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });


  //payment gateway api
export const braintreeTokenController=async(req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send({
                    success:false,
                    message:"Error while getting payment token",
                    error:err
                })
            }
            else{
                res.send(response);
            }
        });
    }
    catch(error){
        console.log("Error while getting payment token ",error.message);

    }
}  

export const braintreePaymentController=async(req,res)=>{
      try{
        const {cart,nonce}= req.body;
          let total=0;
                cart.map( (item)=> {total=total+item.price});

                let newTransaction= gateway.transaction.sale({
                    amount:total,
                    paymentMethodNonce:nonce,
                    options:{
                        submitForSettlement:true
                    }
                },function(error,result){
                    if(result){
                            const order=new orderModel({
                                products:cart,
                                payment:result,
                                buyer:req.user._id,

                            }).save();

                            res.json({
                                ok:true
                            })
                    }else{
                        res.status(500).send(error)
                    }
                })

      }
      catch(error){
        console.log("Error while making payment ",error.message);
      }
}



export const createProductController=async(req,res)=>{
    try{
      
        const {name, price,description,quantity, category} =req.fields;
        console.log("user ss ",req.fields)

        const {photo}= req.files

        //validation

        switch(true){
            case !name :
                return res.status(500).send({error:"Name cannot be empty",success:false})
 
            case !price :
                return res.status(500).send({error:"Price is required",success:false})
            case !description :
                return res.status(500).send({error:"Description cannot be empty",success:false}) 
                case !quantity :
                return res.status(500).send({error:"Quantity cannot be empty",success:false})
            case !category :
                return res.status(500).send({error:"Category cannot be empty",success:false})    
            case photo && photo.size>1000000 :
                return res.status(500).send({error:"Size of photo is too large",success:false})    
        }



        const product=new Product({...req.fields,slug:slugify(name)})


        if(photo){
            product.photo.data=fs.readFileSync(photo.path)
            product.photo.contentType=photo.type
        }
        await product.save();
          
        res.status(201).send({
            success:true,
            message:"Product created successfully",
            product
        })

    }
    catch(error){
            console.log("Error while creating product ", error.message)
             res.status(500).send({
                message:"Error while creating product",
                error,
                success:false
             })
    }
}

export const getproductController=async(req,res)=>{
    try{
            const products=await Product.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});

            res.status(200).send({
                success:true,
                message:"All products ",
                products
            })
    }
    catch(error){
        console.log("Error while getting product ", error.message);

        res.status(500).send({
            success:false,
            message:"Error while getting product",
            error
        })
    }
}

export const getSingleProductController=async(req,res)=>{
    try{

        const {slug} =req.params

        const product=await Product.findOne({slug}).select("-photo").populate("category");

        res.status(200).send({
            message:"Single product",
            product,
            success:true
        })
    }
    catch(error){
        console.log("Error while getting single product ", error.message);
        res.status(500).send({
            success:true,
            message:"Error while getting single product",
            error:error.message
        })
    }
}

export const productPhotoController= async(req,res)=>{
    try{
            const product=await Product.findById(req.params.pid).select("photo")

            if(product.photo.data){
                 res.set("Content-type",product.photo.contentType);
               return  res.status(200).send(product.photo.data)
            }
    }
    catch(error){
        console.log("Error  while getting product  photo ",error.message)
        res.status(500).send({
            message:"Error while getting product photo",
            error,
            success:false
        })
    }
}

export const deleteProductController= async(req,res)=>{
    try{
            await  Product.findByIdAndDelete(req.params.pid).select("-photo")

            res.status(200).send({
                success:true,
                message:"Product deleted successfully"
            })
    }
    catch(error){
        console.log("Error while deleting product  ", error.message);
        res.status(500).send({
            success:false,
            message:"Error while deleting product",
            error
        })
    }
}




export const updateProductController=async(req,res)=>{
    try{
      
        const {name, price,description,quantity, category} =req.fields;

        const {photo}= req.files

        //validation

        switch(true){
            case !name :
                return res.status(500).send({error:"Name cannot be empty",success:false})
 
            case !price :
                return res.status(500).send({error:"Price is required",success:false})
            case !description :
                return res.status(500).send({error:"Description cannot be empty",success:false}) 
                case !quantity :
                return res.status(500).send({error:"Quantity cannot be empty",success:false})
            case !category :
                return res.status(500).send({error:"Category cannot be empty",success:false})    
            case photo && photo.size>1000000 :
                return res.status(500).send({error:"Size of photo is too large",success:false})    
        }



        const product=await Product.findByIdAndUpdate(req.params.pid,{
            ...req.fields, slug:slugify(name)
        },{new:true})


        if(photo){
            product.photo.data=fs.readFileSync(photo.path)
            product.photo.contentType=photo.type
        }
        await product.save();
          
        res.status(201).send({
            success:true,
            message:"Product updated successfully",
            product
        })

    }
    catch(error){
            console.log("Error while updating product ", error.message)
             res.status(500).send({
                message:"Error while updating product",
                error,
                success:false
             })
    }
}

export const productFilterController= async(req,res)=>{
    try{

        const {checked,radio}= req.body;

         let args={}
         if(checked.length>0){
            args.category=checked
         }

         if(radio.length) args.price={$gte: radio[0], $lte:radio[1]};

         const products=await Product.find(args);
         res.status(200).send({
            success:true,
            products,
         })




    }
    catch(error){
        console.log("Error while filtering products ",error.message);
        res.status(400).send({
            error,
            success:false,
            message:"Error while filtering products"
        })
    }
}

export const productCountController= async(req,res)=>{
    try{
        const total=await Product.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            message:"Paginated products",
            total
        })
    }
    catch(error){
        console.log("Error while geeting product count ", error.message);
        return res.status(500).send({
            success:false,
            message:"Error while pagination",
            error
        })
    }
}

export const productListController= async(req,res)=>{
     try{

        const perPage=6
        const page=req.params.page?req.params.page:1
        
        const products=await Product.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
            res.status(200).send({
                success:true,
                products,  
            })

     }
     catch(error){
        console.log("Error while getting product list ", error.message);
        res.status(400).send({
            success:false,
            message:"Error while getting product list",
            error
        })
     }
}

export const searchProductController= async(req,res)=>{
    try{
        const {keyword}=req.params;
        const products=await Product.find({
            $or:[ {
                name:{$regex:keyword,$options:"i"}
            },{
                description:{$regex:keyword,$options:"i"}
            }]
        }).select("-photo");
        res.status(200).send({
            success:true,
            products
        })

    }
    catch(error){
        console.log("Error while searching products ",error.message);
        res.status(400).send({
            error,
            success:true,
            message:"Error while searching products"
        })
    }
}

export const relatedProductController=async(req,res)=>{
    try{
        const {pid,cid}=req.params;


        const products=await Product.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(3).populate("category");

        return res.status(200).send({
            success:true,
            products
        })

    }
    catch(error){
        console.log("Error while getting similar products ",error.message);
        res.status(400).send({
            success:false,
            error
        })
    }
}

export const productCategoryController=async(req,res)=>{
    try{
        const slug=req.params.slug;
        const category=await categoryModel.findOne({slug});
        const products=await Product.find({category}).populate("category");   
        return res.status(200).send({
                success:true,
                products,
                category
            })
    }
    catch(error){
        console.log("Error while getting category wise products ",error.message);
        res.status(400).send({
            error,
            success:false
        })
    }
}