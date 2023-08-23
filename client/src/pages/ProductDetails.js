import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getSimilarProducts, getSingleProduct } from "../services/ProductApi";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../context/cart";

import { toast } from "react-hot-toast";

import "../style/productDetails.css";

const PorductDetails = () => {
  const URL = process.env.REACT_APP_API;

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const { slug } = useParams();

  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const data = await getSingleProduct(slug);
      setProduct(data?.product);
      // console.log("fii ",/)
      getSimiPro(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log("Error while getting single product ", error.message);
    }
  };

  useEffect(() => {
    if (slug !== undefined) getProduct();
  }, [slug]);

  const getSimiPro = async (pid, cid) => {
    try {
      const data = await getSimilarProducts(pid, cid);
      setRelatedProducts(data.products);
    } catch (error) {
      console.log("Error while getting similar products ", error.message);
    }
  };

  const handleWishlist = (product) => {
    toast.success(`${product.name} has been added to wishlist`);
  };

  return (
    <Layout>
      {/* <div className="row container mt-2">
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
       } */}
      <div className="product-details">
        <div className="col-md-6 left">
          {product !== undefined && (
            <>
              <img
                src={`${URL}/api/v1/product/product-photo/${product?._id}`}
                style={{ width: "18rem" }}
                height="300"
                className="card-img-top"
                alt={product?.name}
              />
              <img
                src={`${URL}/api/v1/product/product-photo/${product?._id}`}
                style={{ width: "18rem" }}
                height="300"
                className="card-img-top"
                alt={product?.name}
              />
            </>
          )}
        </div>
        <div className="col-md-6 right">
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>

          <div className="product-price">
            <h6>Price : ₹ {product.price} </h6>
            <h6> MRP ₹ {product.price - 500} </h6>
            <h6>Price : (10 % OFF) </h6>
          </div>
          <h6 style={{ color: "green" }}>Inclusive of all taxes</h6>
          <div className="size-section"></div>
          <h6>Category : {product?.category?.name} </h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
          <button className="btn btn-secondary ms-1">WISHLIST</button>
        </div>
      </div>

      {
        relatedProducts?.length >= 1 && (
        <>
          <div className="similar-products">
          <hr />
          <h5 >Similar products</h5>
         
          <div className="d-flex flex-wrap pro-card-details">
         
            {relatedProducts?.map((product) => (
              <div className="card m-2 card-box" style={{ width: "17rem" }}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="faHeart"
                  onClick={() => {
                    handleWishlist(product);
                  }}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  className="faEye"
                  onClick={() => {
                    navigate(`/product/${product.slug}`);
                  }}
                />

                <img
                  src={`${URL}/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={product.name}
                />

                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 25)}....
                  </p>
                  <div className="pro-price">
                    <div className="card-text fp">
                      {" "}
                      ₹ {product.price - 500}{" "}
                    </div>
                    <div className="card-text sp"> ₹ {product.price} </div>

                    <div className="off"> ( 10 % OFF ) </div>
                  </div>

                 
                </div>
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default PorductDetails;
