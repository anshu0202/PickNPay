// import React , {useState, useEffect} from "react";
// import Layout from "../../components/Layout/Layout";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import { createProduct, deleteProduct, getAllCategory, getSingleProduct, updateProduct } from "../../services/ProductApi";

// import {Select} from "antd";
// import { toast } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";


// //It helps to create drop down menu
// const {Option}=Select;



// const UpdateProduct = () => {

//   const URL = process.env.REACT_APP_API;


//   const [categories, setCategories]= useState([]);
//   const [photo, setPhoto]= useState("");
//   const [name, setName]= useState("");

//   const [pic2, setPic2]= useState("");
  
//   const [category, setCategory]= useState("");

//   const [price, setPrice]= useState("");
//   const [description, setDescription]=useState("");
//   const [quantity, setQuantity]=useState("");
//    const [shipping, setShipping]=useState("");

//    const [id,setId]=useState("");

//    const params=useParams();


//    const getSinglePro=async()=>{
//        try{
//         const data=await getSingleProduct(params.slug);

//         if(data?.success){
//             setName(data.product.name);
//             setCategory(data.product.category._id);
//             setDescription(data.product.description);
//             setPrice(data.product.price);
//             setQuantity(data.product.quantity);

//             setShipping(data.product.shipping);   
//             setId(data.product._id)        
//         }
//        }
//        catch(error){
//         console.log("Error while getting single product ", error.message);
        
//        }
//    }

//    const navigate=useNavigate();


   
//    const getAllCat=async()=>{
//      const data = await getAllCategory();
//      if (data?.success) {
//        setCategories(data?.category);
//       }
//     }
//     useEffect(()=>{
//        getSinglePro();
//        getAllCat();
//        //eslint-disable-next-line
//     },[])
//     //  useEffect(()=>{
//   //       getAllCat();

//   //  },[]);

//    //create product function

//    const handleUpdate=async(e)=>{
//        e.preventDefault();
//        try{
//         const productData= new FormData();
//         productData.append("name",name);
//         productData.append("price", price);
//         productData.append("quantity",quantity);
//         productData.append("description",description)
//         productData.append("shipping",shipping);
//         productData.append("category",category);
//        photo && productData.append("photo",photo);

//         const data=await updateProduct(id,productData);

//         if(data?.success){
//           toast.success("Product Updated Successfully");
//           navigate("/dashboard/admin/products")
//         }
//         else{
//           toast.error(data?.message);
//         }

//        }
//        catch(error){
//         console.log("Error while updating product ", error.message);
//          toast.error("Error while updating product ", error.message);
//        }
//    }


//    // delete product api

//    const handleDelete= async()=>{
//     try{

//       let answer=window.confirm("Are you sure to delete this product?");
//       if(!answer) return;

//       const data= await deleteProduct(id);
//       if(data.success){
//          toast.success("Product deleted successfully");
//          navigate("/dashboard/admin/products")
//       }
//     }
//     catch(error){
//       console.log("Error while deleting product ",error.message);
//       toast.error("Error while deleting product ", error.message);
//     }
//    }


//   return (
//     <>
//       <Layout title={"Update-Product"}>
//         {/* <div className="container-fluid p-3 admin-pro-update" >
//           <div className="row">
//             <div className="col-md-3">
//               <AdminMenu />
//             </div>

//             <div className="col-md-9">

//               <div className="m-1 w-75">
//               <h1 className="text-center">Update Product</h1>
//                 <Select bordered={false} placeholder="Select a category" value={category} size="large" showSearch className="form-select mb-3"onChange={(value) =>{setCategory(value)}} >
//                 {
//                   categories?.map(c=>(
//                     <Option key={c._id} value={c._id}> {c.name}
//                     </Option>
//                   ))

                  
//                 }

//                 </Select>
//                   <div className="mb-3 text-center">
//                     <label  className="btn btn-outline-secondary col-md-6">
//                     {photo ? photo.name:"Upload Photo"} 
//                       <input type="file" name="photo"  accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])}  hidden/>
//                     </label>
//                   </div>
//                   <div className="mb-3">
//                     {photo ? (
//                       <div className="text-center">
//                       <img src={URL.createObjectURL(photo)} alt="product photo" height={'200px'} className="img img-responsive" />
//                       </div>
//                     ):(
//                       <div className="text-center">
//                       <img src={`${URL}/api/v1/product/product-photo/${id}`} alt="product photo" height={'200px'} className="img img-responsive" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="mb-3">
//                   <input type="text" value={name} placeholder="Product Name" className="form-control" onChange={(e)=>{setName(e.target.value)}}/>

//                   </div>
//                   <div className="mb-3">
//                   <textarea type="text" value={description} placeholder="Product Description" className="form-control" onChange={(e)=>{setDescription(e.target.value)}}/>

//                   </div>
//                   <div className="mb-3">
//                   <input type="number" value={price} placeholder="Product Price" className="form-control" onChange={(e)=>{setPrice(e.target.value)}}/>

//                   </div>
//                   <div className="mb-3">
//                   <input type="number" value={quantity} placeholder="Product Quantity" className="form-control" onChange={(e)=>{setQuantity(e.target.value)}}/>

//                   </div>
//                   <div className="mb-3">
//                   <Select bordered={false} placeholder="Product Shipping" size="large"  className="form-select mb-3" value={shipping?"Yes":"No"} onChange={(value) =>{setShipping(value)}} >
                
//                     <Option key="1" value={0}> No </Option>
//                     <Option key="2" value={1}> Yes </Option>
                 

//                 </Select>
                 

//                   </div>
//                   <div className="mb-3 text-center">
//                     <button type="submit" className="btn btn-primary " onClick={(e)=>{handleUpdate(e)}}>
//                         Update Product
//                     </button>
                   
//                   </div>
//                   <div className="mb-3 text-center">
//                     <button className="btn btn-danger " onClick={()=>{handleDelete()}}>
//                         Delete Product
//                     </button>
                   
//                   </div>

//               </div>
//             </div>
//           </div>
//         </div> */}

//         <div className="container-fluid p-3 update-pro-page" >
          
//             <div className="admin-dashboard">
//               <AdminMenu />      
//           </div>
//           <div className="pro-update-form">

//               <div className="m-1 w-75">
//               <h1 className="text-center">Update Product</h1>
//                 <Select bordered={false} placeholder="Select a category" value={category} size="large" showSearch className="form-select mb-3"onChange={(value) =>{setCategory(value)}} >
//                 {
//                   categories?.map(c=>(
//                     <Option key={c._id} value={c._id}> {c.name}
//                     </Option>
//                   ))

                  
//                 }

//                 </Select>
//                   <div className="mb-3 text-center">
//                     <label  className="btn btn-outline-secondary col-md-6">
//                     {photo ? photo.name:"Upload Photo"} 
//                       <input type="file" name="photo"  accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])}  hidden/>
//                     </label>
//                   </div>
//                   <div className="mb-3">
//                     {photo ? (
//                       <div className="text-center">
//                       <img src={URL.createObjectURL(photo)} alt="product photo" height={'200px'} className="img img-responsive" />
//                       </div>
//                     ):(
//                       <div className="text-center">
//                       <img src={`${URL}/api/v1/product/product-photo/${id}`} alt="product photo" height={'200px'} className="img img-responsive" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="mb-3 text-center">
//                     <label  className="btn btn-outline-secondary col-md-6">
//                     {photo ? photo.name:"Upload Photo"} 
//                       <input type="file" name="photo"  accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])}  hidden/>
//                     </label>
//                   </div>
//                   <div className="mb-3">
//                     {photo ? (
//                       <div className="text-center">
//                       <img src={URL.createObjectURL(photo)} alt="product photo" height={'200px'} className="img img-responsive" />
//                       </div>
//                     ):(
//                       <div className="text-center">
//                       <img src={`${URL}/api/v1/product/product-photo/${id}`} alt="product photo" height={'200px'} className="img img-responsive" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="mb-3">
//                   <input type="text" value={name} placeholder="Product Name" className="form-control" onChange={(e)=>{setName(e.target.value)}}/>

//                   </div>
//                   <div className="mb-3">
//                   <textarea type="text" value={description} placeholder="Product Description" className="form-control" onChange={(e)=>{setDescription(e.target.value)}}/>

//                   </div>
//                   <div className="mb-3">
//                   <input type="number" value={price} placeholder="Product Price" className="form-control" onChange={(e)=>{setPrice(e.target.value)}}/>

//                   </div>
//                   <div className="mb-3">
//                   <input type="number" value={quantity} placeholder="Product Quantity" className="form-control" onChange={(e)=>{setQuantity(e.target.value)}}/>

//                   </div>
//                   <div className="mb-3">
//                   <Select bordered={false} placeholder="Product Shipping" size="large"  className="form-select mb-3" value={shipping?"Yes":"No"} onChange={(value) =>{setShipping(value)}} >
                
//                     <Option key="1" value={0}> No </Option>
//                     <Option key="2" value={1}> Yes </Option>
                 

//                 </Select>
                 

//                   </div>
//                   <div className="mb-3 text-center">
//                     <button type="submit" className="btn btn-primary " onClick={(e)=>{handleUpdate(e)}}>
//                         Update Product
//                     </button>
                   
//                   </div>
//                   <div className="mb-3 text-center">
//                     <button className="btn btn-danger " onClick={()=>{handleDelete()}}>
//                         Delete Product
//                     </button>
                   
//                   </div>

//               </div>
//             </div>

//         </div>



//       </Layout>
//     </>
//   );
// };

// export default UpdateProduct;








import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { createProduct, deleteProduct, getAllCategory,getSingleProduct,updateProduct } from "../../services/ProductApi";

import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate,useParams } from "react-router-dom";
import "../../../src/style/adminStyle/adminMenu.css";
import ProductSpecification from "./ProductSpecification";
import ProductSpecification2 from "./ProductSpecification2";

//It helps to create drop down menu
const { Option } = Select;

const UpdateProduct = () => {
  const URL = process.env.REACT_APP_API;
  const [categories, setCategories] = useState([]);
  const [subCategory,setSubCategory]= useState([]);
  const [selectedSub,setSelectedSub]=useState("");
  const [list,setList]=useState([]);
  const [photo, setPhoto] = useState("");
  const [pic2,setPic2]=useState("")
  const [name, setName] = useState("");
  

  const [category, setCategory] = useState();

  // const [subCategory,setSubCategory]=useState([]);

  const [price, setPrice] = useState("100 ");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1000");
  const [shipping, setShipping] = useState("");

  const [id,setId]=useState("");

   const params=useParams();

  const navigate = useNavigate();

  const getSubCategory=async(cate)=>{
      console.log("cate ",cate)
      const selectedCategory = categories.find(c => c._id === cate);
      if (selectedCategory) {
        setSubCategory(selectedCategory.subCategory);
      }
  }

  const getAllCat = async () => {
    const data = await getAllCategory();
    if (data?.success) {
      setCategories(data?.category);
      setSubCategory(data?.subCategory)
      
    }
  };
  useEffect(() => {
    getAllCat();
  }, []);

  //create product function

  const handleCreate = async (e) => {
    e.preventDefault();
    try {

        if(description.length<40){
          toast.error("Description of product should be more than 40 words")
          return;
        }

        // console.log("list item are ",list);


      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("description", description);
      productData.append("shipping", shipping);
      productData.append("category", category);
      productData.append("subCategory", selectedSub);
      productData.append("photo", photo);
      productData.append("pic2", pic2);
      productData.append("list",JSON.stringify(list));
      // console.log("pro fdata ",selectedSub)

      const data = await createProduct(productData);
      // const data={};
      console.log("dayta osn ",data)

      if (data?.success) {
        toast.success("Product created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Error while creating new product ", error.message);
      toast.error("Error while creating new product ", error.message);
    }
  };



  /// yaha se copy 

  

   


   const getSinglePro=async()=>{
       try{
        const data=await getSingleProduct(params.slug);

        if(data?.success){
            console.log("pro data idsd edjk ",data.product)
            setName(data.product.name);
            setCategory(data.product.category._id);
            setDescription(data.product.description);
            // setPrice(data.product.price);
            // setQuantity(data.product.quantity);
            setList(data.product.list);

            setShipping(data.product.shipping);   
            setId(data.product._id)        
        }
       }
       catch(error){
        console.log("Error while getting single product ", error.message);
        
       }
   }

  //  const navigate=useNavigate();


   
  //  const getAllCat=async()=>{
  //    const data = await getAllCategory();
  //    if (data?.success) {
  //      setCategories(data?.category);
  //     }
  //   }

    useEffect(()=>{
       getSinglePro();
       getAllCat();
       //eslint-disable-next-line
    },[])


    //  useEffect(()=>{
  //       getAllCat();

  //  },[]);



  const handleUpdate=async(e)=>{
           e.preventDefault();
           try{
            const productData= new FormData();
            productData.append("name",name);
            productData.append("price", price);
            productData.append("quantity",quantity);
            productData.append("description",description)
            productData.append("shipping",shipping);
            productData.append("category",category);
           photo && productData.append("photo",photo);
    
            const data=await updateProduct(id,productData);
    
            if(data?.success){
              toast.success("Product Updated Successfully");
              navigate("/dashboard/admin/products")
            }
            else{
              toast.error(data?.message);
            }
    
           }
           catch(error){
            console.log("Error while updating product ", error.message);
             toast.error("Error while updating product ", error.message);
           }
       }
    
    
       // delete product api
    
       const handleDelete= async()=>{
        try{
    
          let answer=window.confirm("Are you sure to delete this product?");
          if(!answer) return;
    
          const data= await deleteProduct(id);
          if(data.success){
             toast.success("Product deleted successfully");
             navigate("/dashboard/admin/products")
          }
        }
        catch(error){
          console.log("Error while deleting product ",error.message);
          toast.error("Error while deleting product ", error.message);
        }
       }
    

  return (
    <>
      <Layout title={"Update-Product"}>
       

        <div className="admin-dashboard-product">
          <AdminMenu />
          <div className="admin-dashboard-product-content">
            <h1 className="text-center">Update Product</h1>
            <div className="admin-pro-form">
              <div className="m-1 w-75">
               
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    // console.log("va;ue os ",value)
                    setCategory(value);
                    getSubCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}  >
                      {" "}
                      {c.name}
                    </Option>
                  ))}
                </Select>
                {
                    subCategory?.length>0 &&
                    <Select
                  bordered={false}
                  placeholder="Select sub-category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setSelectedSub(value);
                  }}
                >
                  {subCategory?.map((c,index) => (
                    <Option key={index} value={c}>
                      {" "}
                      {c}
                    </Option>
                  ))}
                </Select>
                }
                {/* <div className="mb-3 text-center admin-image-list"> */}
                <div className="mb-3 text-center">
                     <label  className="btn btn-outline-secondary col-md-6">
                     {photo ? photo.name:"Upload Photo"} 
                       <input type="file" name="photo"  accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])}  hidden/>
                     </label>
                   </div>
                   <div className="mb-3">
                     {photo ? (
                       <div className="text-center">
                       <img src={URL.createObjectURL(photo)} alt="product photo" height={'200px'} className="img img-responsive" />
                       </div>
                     ):(
                       <div className="text-center">
                       <img src={`${URL}/api/v1/product/product-photo/${id}`} alt="product photo" height={'200px'} className="img img-responsive" />
                      </div>
                     )}
                 {/* </div> */}

                  {/* <label className="btn btn-outline-secondary col-md-6">
                    {photo ? photo.name : "Upload 1st image of product"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label> */}
                  {/* <label className="btn btn-outline-secondary col-md-6">
                    {pic2 ? photo.name : "Upload 2nd image of product"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPic2(e.target.files[0])}
                      hidden
                    />
                  </label> */}
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                  {/* {pic2 && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(pic2)}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )} */}
                </div>





                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Product Name"
                    className="form-control"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Product Description"
                    className="form-control"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              
                <ProductSpecification2  list={list} setList={setList}  subCategory={subCategory}/>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Product Shipping"
                    size="large"
                    value={shipping}
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option key="1" value="0">
                      {" "}
                      No{" "}
                    </Option>
                    <Option key="2" value="1">
                      {" "}
                      Yes{" "}
                    </Option>
                  </Select>
                </div>
              
                <div className="mb-3 text-center">
                     <button type="submit" className="btn btn-primary " onClick={(e)=>{handleUpdate(e)}}>
                        Update Product
                     </button>
                   
                   </div>
                   <div className="mb-3 text-center">
                     <button className="btn btn-danger " onClick={()=>{handleDelete()}}>
                         Delete Product
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

export default UpdateProduct;
