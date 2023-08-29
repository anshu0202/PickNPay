import mongoose from "mongoose";


const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    subCategory:Array,
    slug:{
        type:String,
        lowercase:true
    }
})

const categoryModel=mongoose.model("category",categorySchema);

export default categoryModel;