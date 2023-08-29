// import mongoose from "mongoose";

// const productSchema= new mongoose.Schema({
//    name:{
//     type:String,
//     required:true
//    },
//    slug:{
//     type:String,
//     required:true
//    },
//    description:{
//       type:String,
//       required:true
//    },
//    price:{
//     type:Number,
//     required:true
//    },
//    // category:{
//    //  type:mongoose.ObjectId,
//    //  ref:'category',
//    //  required:true
//    // },
//    subCategory:{
//       type:mongoose.ObjectId,
//       ref:'category',
//       required:true
//      },
//    quantity:{
//     type:Number,
//     required:true
//    },

//    list:{

//    },

//    photo:{
//     data:Buffer,
//     contentType:String
//    },
//    shipping:{
//     type:Boolean
//    }

// },{timestamps:true})

// const productModel=mongoose.model("Products",productSchema);
// export  default productModel;

import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   slug:{
    type:String,
    required:true
   },
   description:{
      type:String,
      required:true
   },
   category:{
    type:mongoose.ObjectId,
    ref:'category',
    required:true
   },
   subCategory:{
      type:String,
      required:true
     },
  
   list:[{
      size: {
          type: String,
          required: true
      },
      price: {
          type: Number,
          required: true
      },
      quantity: {
          type: Number,
          required: true
      },
      offer:{
        type: Number,
        default:0
      }
  }],

   photo:{
    data:Buffer,
    contentType:String
   },
   pic2:{
      data:Buffer,
      contentType:String
     },
   shipping:{
    type:Boolean
   }

},{timestamps:true})

const productModel=mongoose.model("Products",productSchema);
export  default productModel;

