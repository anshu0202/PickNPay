import React , {useState, useEffect} from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { createProduct, getAllCategory } from "../../services/ProductApi";

import {Select} from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


//It helps to create drop down menu
const {Option}=Select;



const CreateProduct = () => {

  const [categories, setCategories]= useState([]);
  const [photo, setPhoto]= useState("");
  const [name, setName]= useState("");

  const [category, setCategory]= useState();

  const [price, setPrice]= useState("");
  const [description, setDescription]=useState("");
  const [quantity, setQuantity]=useState("");
   const [shipping, setShipping]=useState("");

   const navigate=useNavigate();
   
const getAllCat=async()=>{
  const data = await getAllCategory();
    if (data?.success) {
      setCategories(data?.category);
    }
}
   useEffect(()=>{
        getAllCat();

   },[]);

   //create product function

   const handleCreate=async(e)=>{
       e.preventDefault();
       try{
        const productData= new FormData();
        productData.append("name",name);
        productData.append("price", price);
        productData.append("quantity",quantity);
        productData.append("description",description)
        productData.append("shipping",shipping);
        productData.append("category",category);
        productData.append("photo",photo);

        const data=await createProduct(productData);

        if(data?.success){
          toast.success("Product created Successfully");
          navigate("/dashboard/admin/products")
        }
        else{
          toast.error(data?.message);
        }

       }
       catch(error){
        console.log("Error while creating new product ", error.message);
         toast.error("Error while creating new product ", error.message);
       }
   }


  return (
    <>
      <Layout title={"Create-Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>

            <div className="col-md-9">

              <div className="m-1 w-75">
              <h1 className="text-center">Create Product</h1>
                <Select bordered={false} placeholder="Select a category" size="large" showSearch className="form-select mb-3"onChange={(value) =>{setCategory(value)}} >
                {
                  categories?.map(c=>(
                    <Option key={c._id} value={c._id}> {c.name}
                    </Option>
                  ))

                  
                }

                </Select>
                  <div className="mb-3 text-center">
                    <label  className="btn btn-outline-secondary col-md-6">
                    {photo ? photo.name:"Upload Photo"} 
                      <input type="file" name="photo"  accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])}  hidden/>
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="product photo" height={'200px'} className="img img-responsive" />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                  <input type="text" value={name} placeholder="Product Name" className="form-control" onChange={(e)=>{setName(e.target.value)}}/>

                  </div>
                  <div className="mb-3">
                  <textarea type="text" value={description} placeholder="Product Description" className="form-control" onChange={(e)=>{setDescription(e.target.value)}}/>

                  </div>
                  <div className="mb-3">
                  <input type="number" value={price} placeholder="Product Price" className="form-control" onChange={(e)=>{setPrice(e.target.value)}}/>

                  </div>
                  <div className="mb-3">
                  <input type="number" value={quantity} placeholder="Product Quantity" className="form-control" onChange={(e)=>{setQuantity(e.target.value)}}/>

                  </div>
                  <div className="mb-3">
                  <Select bordered={false} placeholder="Product Shipping" size="large"  className="form-select mb-3"onChange={(value) =>{setShipping(value)}} >
                
                    <Option key="1" value="0"> No </Option>
                    <Option key="2" value="1"> Yes </Option>
                 

                </Select>
                 

                  </div>
                  <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary " onClick={(e)=>{handleCreate(e)}}>
                        Create Product
                    </button>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
