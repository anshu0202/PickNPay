import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout';
import { getCategoryProduct } from '../services/ProductApi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';

const CategoryProduct = () => {

  const URL = process.env.REACT_APP_API;


  const [products,setProducts]=useState([]);
  const [category,setCategory]=useState([]);

  const [cart,setCart]=useCart();


  const params=useParams();

  const navigate=useNavigate();
  
  const getCatPro=async()=>{
    try{
      const data=await getCategoryProduct(params.slug);
      
        if(data?.success){
          setProducts(data?.products);
          setCategory(data?.category)
          
        }

    }
    catch(error){
      console.log("Error while getting products according to category ",error.message);
    }
  }

  useEffect(()=>{

       if(params?.slug){

         getCatPro();

       } 

  },[params?.slug])

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>{products?.length} results</h6>
        <div className="row">
        <div className="col-md-9 offset-1">
          <h1 className='text-center'>All Products  </h1>
        
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
    toast.success(`${product.name} has been added to cart`);
    }} >ADD TO CART</button>
  </div>
</div>
        

          )) 
        }
          </div>
          </div>
          </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct;
