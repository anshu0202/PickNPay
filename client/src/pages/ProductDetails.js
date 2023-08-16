import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { getSimilarProducts, getSingleProduct } from '../services/ProductApi';
import { useParams , useNavigate} from 'react-router-dom';

const PorductDetails = () => {
  const URL = process.env.REACT_APP_API;

  const [product,setProduct]=useState({});
  const [relatedProducts,setRelatedProducts]=useState([]);
   const navigate=useNavigate();

    const {slug}=useParams();

    

  const getProduct=async()=>{
    try{
        const data=await getSingleProduct(slug);
        setProduct(data?.product);
        // console.log("fii ",/)
       getSimiPro(data?.product?._id,data?.product?.category?._id)
    }
    catch(error){
      console.log("Error while getting single product ",error.message);
    }
  }

  useEffect(()=>{
     if(slug!==undefined) getProduct();
  },[slug]);

  const getSimiPro=async(pid,cid)=>{
    try{
        const data=await getSimilarProducts(pid,cid);
        setRelatedProducts(data.products);
    }
    catch(error){
      console.log("Error while getting similar products ",error.message);
    }
  }



  return (
    <Layout>
    
       <div className="row container mt-2">
              <div className="col-md-6">
             {

              product!==undefined && <img src={`${URL}/api/v1/product/product-photo/${product?._id}`} style={{width: '18rem'}} height='300'className="card-img-top"alt={product?.name} />
             }

              </div>
              <div className="col-md-6 ">
                <h1 className='text-center'>Product Details</h1>
                <h6>Name : {product.name}</h6>
                <h6>Description : {product.description}</h6>  
                <h6>Price : ₹ {product.price} </h6>
                <h6>Category : {product?.category?.name} </h6>
                <button className='btn btn-secondary ms-1'>ADD TO CART</button>
              </div>
       </div>
       { relatedProducts?.length>=1 &&
       <>

       <hr />
       <div className="row container text-center">

       <h6>Similar Products</h6>
       <div className="d-flex flex-wrap">
          {
          relatedProducts?.map(product =>(
            

           <div className="card m-2"   >
  <img src={`${URL}/api/v1/product/product-photo/${product._id}`} style={{width: '18rem'}} className="card-img-top" alt={product.name} />
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description.substring(0,20)}....</p>
    <p className="card-text"> ₹ {product.price}</p>
   
    <button className='btn btn-secondary ms-1'>ADD TO CART</button>
  </div>
</div>
        

          )) 
        }
          </div>
       </div>
       </>
       }
    </Layout>
  )
}

export default PorductDetails
