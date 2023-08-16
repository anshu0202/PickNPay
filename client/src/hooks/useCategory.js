import { useState,useEffect } from "react";

import axios from "axios";
import { getAllCategory } from "../services/ProductApi";

export default function useCategory(){
    const [categories,setCategories]=useState([]);

    // get cat
    const getCat=async()=>{
        try{
           const data=await getAllCategory();
           if(data?.success)
           {
            setCategories(data?.category);
           }
        }
        catch(error){
            console.log("Error while getting categories ",error.message);
        }
    }
    useEffect(()=>{
       getCat();
    },[])

    return categories;
}
