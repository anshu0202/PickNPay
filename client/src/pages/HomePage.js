import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'


import { getAllCategory, getAllProductsList, getFilterProducts, getTotalCount } from '../services/ProductApi';
import { toast } from 'react-hot-toast';
import {  useNavigate} from 'react-router-dom';
// import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart';
import { useWishList } from '../context/wishlist';

import HomeBanner from '../components/HomeComponent/HomeBanner';
// import { fa-regular, fa-heart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faHeart } from '@fortawesome/free-solid-svg-icons'

import Filter from '../components/HomeComponent/Filter';


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

   const [wishList,setWishList]=useWishList();

   console.log("wish list is ",wishList)

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

   const [isMouseOver, setIsMouseOver] = useState(false);
   const [showFirstImage, setShowFirstImage] = useState(true);
 
   const handleMouseEnter = () => {
     setIsMouseOver(true);
   };
 
   const handleMouseLeave = () => {
     setIsMouseOver(false);
     setShowFirstImage(true);
   };
 

   const handleAddToCart = (product) => {
    // Check if the same product with the same size is already in the cart

    // console.log("producvt is ", product);
    const existingCartItem = cart.find(
      (item) => item._id === product._id 
    );

    if (existingCartItem) {
      
      toast.success(`${product.name} has been added to cart.`);
      return;
    }

    

    // If not already in the cart, add the new cart item
    const newCartItem = {
      _id: product._id,
      size: product.list[0].size,
      price: product.list[0].price,
      quantity: 1,
      offer: product.list[0].offer,
      description: product.description,
      name: product.name,
      category:product.category.name,
      subCategory: product.subCategory,
      list:product.list
      // Other relevant product details
    };

    setCart((prevCart) => [...prevCart, newCartItem]);
    localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
    toast.success(`${product.name} has been added to cart.`);
  };

   // Set interval to toggle images if mouse is over the card
   React.useEffect(() => {
     let interval;
     if (isMouseOver) {
       interval = setInterval(() => {
         setShowFirstImage((prev) => !prev);
       }, 2000);
     } else {
       clearInterval(interval);
     }
     return () => clearInterval(interval);
   }, [isMouseOver]);
 
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


   const handleWishlist=(product)=>{

      // console.log("pro to add is ",product)
    
       setWishList([...wishList,product]);
       localStorage.setItem('wishList',JSON.stringify([...wishList,product]));


           toast.success(`${product.name} has been added to wishlist`)
   }


  return (
    <Layout title={"PickNPay"}  >
    <HomeBanner/>
    <div className="row mt-3 home-container" style={{backgroundColor:" rgb(243, 242, 242);"}}>
   
          <div className="col-md-2">
          <Filter handleFilter={handleFilter} setRadio={setRadio} categories={categories} Prices={Prices}/>
            
          </div>
          
         
          <div className="col-md-10 home-pro-list">
          
          <h2 className='text-center mt-2' >Crazy Deals
          </h2>

        
          <div className="d-flex flex-wrap pro-card"  onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
       
          {
          products?.map(product =>(
        
           <div className="card m-2 card-box" style={{width: '17rem'}}  >
           <FontAwesomeIcon icon={faHeart}  className='faHeart' onClick={()=>{handleWishlist(product)}}  />
           <FontAwesomeIcon icon={faEye}  className='faEye'  onClick={()=>{navigate(`/product/${product.slug}`)}} />
           {showFirstImage ? (
        <img
          src={`${URL}/api/v1/product/product-photo/${product._id}`}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          alt={product.name}
        />
      ) : (
        <img
          src={`${URL}/api/v1/product/product-pic/${product._id}`}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          alt={product.name}
        />
      )}


{/*          
  <img src={`${URL}/api/v1/product/product-photo/${product._id}`}  className="card-img-top"
   style={{ height: "200px", objectFit: "cover" }} 
   alt={product.name} />

<img src={`${URL}/api/v1/product/product-pic/${product._id}`}  className="card-img-top"
   style={{ height: "200px", objectFit: "cover" }} 
   alt={product.name} /> */}
  
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description.substring(0,25)}....</p>
    <div className='pro-price'>
       {
        product.list[0].offer===0? <> <div className="card-text fp">  ₹ {product.list[0].price} </div></>:<>
          <div className="card-text fp">    ₹ {product.list[0].price- (product.list[0].price*product.list[0].offer)/100  } </div>
      <div className="card-text sp">  ₹ {product.list[0].price} </div>

      <div className='off'> ( {product.list[0].offer} % OFF ) </div>
        </>
       }
      
    </div>
   
    <div className='card-btn'>
    
    <button className='card-btn-details' onClick={()=>{navigate(`/product/${product.slug}`)}}>More Details</button>
    <button className='card-btn-add' 
    // onClick={()=>{setCart([...cart,product]);
    // localStorage.setItem('cart', JSON.stringify([...cart,product]));
    // toast.success(`${product.name} has been added to cart`);
    // }} 
    onClick={()=>{handleAddToCart(product)}}
    
    >Add to cart</button>
    </div>
           
         
     
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
