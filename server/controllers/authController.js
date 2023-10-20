import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

import orderModel from "../models/orderModel.js";


export const registerController = async (req, res) => {
  try {
    console.log("hii data from frontend is ", req.body);
    const { name, email, phone, address, password, answer } = req.body;

    // validation
    if (!name) {
      return res.send({ message: "Name is required" });
    } 

    if (!email) {
      return res.send({ message: "Email is requried" });
    }
    if (!answer) {
      return res.send({ message: "Answer is requried" });
    }
    if (!password) {
      res.send({ message: "Password is required" });
    }
    if (!address) {
      res.send({ message: "Address is required" });
    }

    if (!phone) {
      res.send({ message: "Phone number is required" });
    }

    //existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(200).send({ success: false, message: "Already Register please login" });
      return;
    }
    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const newUser = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "New User register successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(`Error while register new suer`, error.message);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email or password is Invalid",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exists",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invaild Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log("Error while login ", error.message);

    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller
export const testController= async(req,res)=>{
    try{
      
    }
    catch(error){

    }
}


export const forgotPassword=async(req,res)=>{
     try{
        const {email,answer,newPassword } = req.body;

        if(!email){
          res.status(400).send({message:"Email is required"})
        }

        if(!answer){
          res.status(400).send({
            message:"Answer is required"
          })
        }
        if(!newPassword){
            res.status(400).send({
              message:"New Password is required" 
            })
        }

        console.log("body is ",req.body)

      const user=await userModel.findOne({email,answer});
     console.log("user is ",user)
      if(!user){
        return res.status(404).send({
          success:true,
          message:"Wrong Email Or Answer"
        })
      }

      const hashed=await hashPassword(newPassword)

      await userModel.findByIdAndUpdate(user._id,{
        password:hashed
      })

      res.status(200).send({
        success:true,
        message:"Password Reset successfully",
      })

     }
     catch(error){
      console.log("Error in forgot password function ",error.message);
        res.status(500).send({
          success:false,message:'Something went wrong',
          error
        })

     }
}


export const updateProfileController=async(req,res)=>{
   try{

     const {name,password,email ,address,phone}=req.body;

        const user=await userModel.findById(req.user._id);
          // if(password && password.length<6){
          //   return res.json({
          //     error:"Password is less than 6 characters "
          //   })
          // }

          const hashedPassword=password? await hashPassword(password):undefined

          const updatedUser=await userModel.findByIdAndUpdate(req.user._id,{name,address,phone,hashedPassword},{new:true})

          console.log("updated user ",updatedUser)

        res.status(200).send({
          success:true,
          updatedUser,
          message:"Profile updated successfully"
        })
   }
   catch(error){
    console.log("Error while updating user profile ",error.message);
    res.status(400).send({
      success:false,
      error,
      message:"Error while updating user profile"
    })
   }
}

// export default {registerController}


// export const getOrdersController=async(req,res)=>{
//    try{
//     const orders= await orderModel.find({buyer:req?.user?._id}).populate("products","-photo -pic2").populate("buyer","name");
//     res.json(orders)

//    }
//    catch(error){
//     console.log("Error while getting all orders ",error.message);
//     res.status(400).send({
//       success:false,
//       error
//     })
//    }
// }


export const getOrdersController = async (req, res) => {
  try {

    console.log("req ids ",req.user)
    const orders = await orderModel
      .find({ buyer: req?.user?._id })
      .populate({
        path: "products.productId",
        select: "-photo -pic2"
      })
      .populate("buyer", "name");

      console.log("orders are ",orders);

    res.json(orders);
  } catch (error) {
    console.log("Error while getting all orders ", error.message);
    res.status(400).send({
      success: false,
      error
    });
  }
};

export const getAllUsersController= async(req,res)=>{
    try{
      const users= await userModel.find({});
    res.json(users)
    }
    catch(error){
      console.log("Error while getting all users by admin ",error.message);
      res.status(400).send({
        error,
        success:false
      })
    }
}


export const getAllOrdersController= async(req,res)=>{
  try{
    const orders= await orderModel.find({}).populate({
      path: "products.productId",
      select: "-photo -pic2"
    })
    .populate("buyer", "name").sort({createdAt:"-1"});
  res.json(orders)
  }
  catch(error){
    console.log("Error while getting all orders ",error.message);
    res.status(400).send({
      error,
      success:false
    })
  }
}

export const orderStatusController= async(req,res)=>{
  try{
    const {orderId}=req.params;
    const {status}= req.body;

    const orders= await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
     res.json(orders)
  }
  catch(error){
    console.log("Error while updating order ",error.message);
    res.status(500).send({
      error,
      success:false
    })
  }
}