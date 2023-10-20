import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useWishList } from "../context/wishlist";

import { toast } from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const [products, setProducts] = useState(values?.results.products);
  console.log("values are ", values);
  const URL = process.env.REACT_APP_API;

  const [cart, setCart] = useCart();

  const [wishList, setWishList] = useWishList();

  const navigate = useNavigate();

  useEffect(() => {
    if (values?.keyword === "") {
      navigate("/");
    }
  }, []);

  const handleWishlist = (product) => {
    // console.log("pro to add is ", product);

    setWishList([...wishList, product]);
    localStorage.setItem("wishList", JSON.stringify([...wishList, product]));

    toast.success(`${product.name} has been added to wishlist`);
  };

  const handleAddToCart = (product) => {
    // Check if the same product with the same size is already in the cart

    // console.log("producvt is ", product);

    const existingCartItem = cart.find((item) => item._id === product._id);

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
      category: product.category.name,
      subCategory: product.subCategory,
      list: product.list,
      // Other relevant product details
    };

    setCart((prevCart) => [...prevCart, newCartItem]);
    localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
    toast.success(`${product.name} has been added to cart.`);
  };

  return (
    <Layout>
      <div className="container" style={{ paddingTop: "5rem" }}>
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results?.products?.length < 1
              ? "No Products Found"
              : `Found ${values?.results?.products?.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results?.products?.map((product) => (
              <div
                className="product-link"
                key={product._id}
                // to={`/dashboard/admin/products/${product.slug}`}
              >
                {/* <div className="card m-2"   >
  <img src={`${URL}/api/v1/product/product-photo/${product._id}`} style={{width: '18rem'}} className="card-img-top" alt={product.name} />
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description.substring(0,20)}....</p>
    <p className="card-text"> ₹ {product.price}</p>
    <button className='btn btn-primary ms-1'>More Details</button>
    <button className='btn btn-secondary ms-1'>ADD TO CART</button>
  </div>
</div> */}

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
                      {product.list[0].offer === 0 ? (
                        <>
                          {" "}
                          <div className="card-text fp">
                            {" "}
                            ₹ {product.list[0].price}{" "}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="card-text fp">
                            {" "}
                            ₹{" "}
                            {product.list[0].price -
                              (product.list[0].price * product.list[0].offer) /
                                100}{" "}
                          </div>
                          <div className="card-text sp">
                            {" "}
                            ₹ {product.list[0].price}{" "}
                          </div>

                          <div className="off">
                            {" "}
                            ( {product.list[0].offer} % OFF ){" "}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="card-btn">
                      <button
                        className="card-btn-details"
                        onClick={() => {
                          navigate(`/product/${product.slug}`);
                        }}
                      >
                        More Details
                      </button>
                      <button
                        className="card-btn-add"
                        // onClick={()=>{setCart([...cart,product]);
                        // localStorage.setItem('cart', JSON.stringify([...cart,product]));
                        // toast.success(`${product.name} has been added to cart`);
                        // }}
                        onClick={() => {
                          handleAddToCart(product);
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
