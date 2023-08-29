import axios from "axios";

import { toast } from "react-hot-toast";

const URL = process.env.REACT_APP_API;


export const getAllCategory=async()=>{
     try{
              const {data}=await axios.get(`${URL}/api/v1/category/getall-category`); 


            //   console.log("data cat ",data);
              return data;
     }
     catch(error){
        console.log("Error while getting all categories ", error.message)
         toast.error("Something went wrong in getting all categories")
     }
}


export const createCategory=async(cat)=>{
    
    const data=await axios.post(`${URL}/api/v1/category/create-category`,cat)
    return data;
}

export const updateCategory=async(id,body)=>{
    const {data}=await axios.put(`${URL}/api/v1/category/update-category/${id}`,body);
        return data;
}

export const deleteCategory=async(id)=>{
    const {data}=await axios.delete(`${URL}/api/v1/category/delete-category/${id}`);
        return data;
}



//product apis

export const createProduct= async(body)=>{
     const {data}=await axios.post(`${URL}/api/v1/product/create-product`,body);
     return data;
}


export const getAllProducts=async()=>{
    const {data}=await axios.get(`${URL}/api/v1/product/get-products`); 
    return data;
}

export const getAllProductsList=async(page)=>{
    const {data}=await axios.get(`${URL}/api/v1/product/product-list/${page}`); 
    return data;
}

export const updateProduct= async(id,body)=>{
    const {data}=await axios.put(`${URL}/api/v1/product/update-product/${id}`,body);
    return data;
}

export const deleteProduct= async(id)=>{
    const {data}=await axios.delete(`${URL}/api/v1/product//delete-product/${id}`);
    return data;
}

export const getSingleProduct=async(slug)=>{
        const {data}=await axios.get(`${URL}/api/v1/product/get-product/${slug}`);
        return data;
}

export const getSingleProductId=async(id)=>{
    const {data}=await axios.get(`${URL}/api/v1/product/get-product-id/${id}`);
    return data;
}

export const getFilterProducts= async(checked,radio)=>{
     const {data} =await axios.post(`${URL}/api/v1/product/product-filters`,{checked,radio})
     return data;
}


export const getTotalCount= async()=>{
    const {data}=await axios.get(`${URL}/api/v1/product/product-count`);
    return data;
}

export const getSearchProducts=async(keyword)=>{
    const {data}= await axios.get(`${URL}/api/v1/product/search/${keyword}`);
    return data;
}

export const getSimilarProducts=async(pid,cid)=>{
    const {data}=await axios.get(`${URL}/api/v1/product/related-product/${pid}/${cid}`);
    return data;
}

export const getCategoryProduct=async(slug)=>{
    const {data}=await axios.get(`${URL}/api/v1/product/product-category/${slug}`)
    return data
}


export const getAllOrders=async()=>{
     const {data}=await axios.get(`${URL}/api/v1/auth/orders`);
     console.log("all my orders ",data)
     return data;
}

export const getAllOrdersAdmin=async()=>{
    const {data}= await axios.get(`${URL}/api/v1/auth/all-orders`);
    return data;
}

export const updateOrder=async(orderId,body)=>{
    const {data}=await  axios.put(`${URL}/api/v1/auth/order-status/${orderId}`,body);
    return data;
}



export const setPaymentProducts= async(body)=>{
    const {data} =await axios.post(`${URL}/api/v1/product/payment-success`,body)
    return data;
}
