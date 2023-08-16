import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'


import { getAllCategory, getAllProductsList, getFilterProducts, getTotalCount } from '../services/ProductApi';
import { toast } from 'react-hot-toast';
import {  useNavigate} from 'react-router-dom';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart';


const HomePage = () => {

   const [products, setProducts]=useState([]);
   const URL = process.env.REACT_APP_API;


   const [categories, setCategories]=useState([]);

   const [checked, setChecked]=useState([]);

   const [radio , setRadio] =useState([]);

   const [total,setTotal]= useState(0);

   const [page,setPage]=useState(1);

   const [loading,setLoading]=useState(false)

   const [cart,setCart]=useCart();

  const navigate=useNavigate();

   const getTotal=async()=>{
    try{

      const data=await getTotalCount();
      if(data.success){
        setTotal(data?.total);
      }
    }
    catch(error){
        console.log("Error while getting total product count ",error.mesage);
        toast.error("Error while getting total count ", error.message);
    }
   }

   useEffect(()=>{
    getTotal();
   },[])


   // get all products and category
   
   const getAllCat= async()=>{
    
      const data = await getAllCategory();
      if (data?.success) {
        setCategories(data?.category);
      
    };
   }
   const getAllPro= async()=>{
    try{
        setLoading(true)
      const data= await getAllProductsList(page);
        setLoading(false)
      // console.log("data is ",data)
      if(data?.success){
          setProducts(data.products);

      }
     
    }
    catch(error){
      setLoading(false);
      console.log("Error while getting all products ",error.message);
    }
   }

   useEffect(()=>{
      if(page===1) return;
      loadMore()
   },[page])

//load more
 const loadMore= async()=>{
     try{
      setLoading(true)
      const data= await getAllProductsList(page);
      setLoading(false);
      setProducts([...products,...data?.products]);
     }
     catch(error){
      console.log("Error while loading more products ",error.message);
      toast.error("Error while loading more products ",error.message)
      setLoading(false);
     }
 }

//filter products 
const filterProduct= async()=>{
  try{
      const data= await getFilterProducts(checked,radio);
       setProducts(data?.products);
  }
  catch(error){
    console.log("Error while getting filtered products ", error.message);
      toast.error("Error while getting filtered products ",error.message)
    
  }
}


   useEffect(()=>{
      getAllCat();
      if(!checked.length || !radio.length)  getAllPro();

     
   
   },[checked.length, radio.length])

   useEffect(()=>{
    if(checked.length || radio.length) filterProduct()
   },[checked,radio])

   const handleFilter= ( value, id)=>{
     let all=[...checked];
      if(value){
        all.push(id);
      }
      else{
        all=all.filter(c=> c!==id)
      }
      setChecked(all);
   }


   


  return (
    <Layout title={"PickNPay"}>
    <div className="row mt-3">

          <div className="col-md-2">
            <h4 className='text-center'>
              Filter By Category  </h4>
              <div className="d-flex flex-column">

              {
                categories?.map(c=>(
                  <Checkbox key={c._id} onChange={(e)=>{ handleFilter(e.target.checked, c._id)}} >{c.name}</Checkbox>
                ))
              }
              </div>
              <h4 className='text-center mt-4'>
              Filter By Price  </h4>
              <div className="d-flex flex-column">
              <Radio.Group onChange={(e)=>{setRadio(e.target.value)}} >
                {
                  Prices?.map(p=>(
                    <div key={p._id}>
                    <Radio value={p.array}> {p.name}
                    </Radio>
                    </div>
                  ))
                }
              </Radio.Group>
             
              </div>
              <div className="d-flex flex-column ">
                
               <button className='btn btn-danger' onClick={()=>{window.location.reload()}}>Reset Filters</button>
              </div>
          </div>
          
         
          <div className="col-md-9">
          
          <h1 className='text-center'>All Products 
          </h1>
          <div className="d-flex flex-wrap">
          {
          products?.map(product =>(
        
           <div className="card m-2"   >
  <img src={`${URL}/api/v1/product/product-photo/${product._id}`} style={{width: '18rem'}} className="card-img-top" alt={product.name} />
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description.substring(0,20)}....</p>
    <p className="card-text"> ₹ {product.price}</p>
    <button className='btn btn-primary ms-1' onClick={()=>{navigate(`/product/${product.slug}`)}}>More Details</button>
    <button className='btn btn-secondary ms-1' onClick={()=>{setCart([...cart,product]);
    localStorage.setItem('cart', JSON.stringify([...cart,product]));
    toast.success(`${product.name} has been added to cart`);
    }} >ADD TO CART</button>
  </div>
</div>
          )) 
        }
          </div>
          <div className='m-2 p-3'>
              {products && products.length<total && (
                <button className='btn btn-warning' onClick={(e)=>{
                  e.preventDefault();
                  setPage(page+1);
                }}>
                {
                    loading?"Loading ...":"Loadmore"
                }
                </button>
              )}
          </div>
          </div>
    </div>
    </Layout>
  )
}

export default HomePage
