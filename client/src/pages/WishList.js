import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useWishList } from "../context/wishlist";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart";

const WishList = () => {
  const [wishList, setWishList] = useWishList();

  const [cart, setCart] = useCart();

  console.log("wish list pro ", wishList);
  const URL = process.env.REACT_APP_API;

  const navigate = useNavigate();

  const handleWishlist = (pid) => {
    // setWishList([...wishList, product]);
    // localStorage.setItem("wishList", JSON.stringify([...wishList, product]));

    // toast.success(`${product.name} has been removed from wishlist`);
    try {
      let myWishList = [...wishList];
      let index = myWishList.findIndex((item) => item._id === pid);
      myWishList.splice(index, 1);
      setWishList(myWishList);
      localStorage.setItem("wishList", JSON.stringify(myWishList));
      toast.success(`Product has been removed from wishlist`);
    } catch (error) {
      console.log("Error while removing wishlist item ", error.message);
    }
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
    <Layout title={"WishList"}>
      <div className="wishList-box">
        {wishList.length == 0 ? (
          <>
            {" "}
            <div> No items are in the WishList </div>{" "}
          </>
        ) : (
          <>
            <div className="wishList-content">
              <div className="wish-header">
                My Wishlist{" "}
                <span className="wishlist-count">
                  {" "}
                  {wishList?.length} Items{" "}
                </span>{" "}
              </div>

              <div className="d-flex flex-wrap pro-wishlist">
                {wishList?.map((product) => (
                  <div className="card m-2 card-box" style={{ width: "17rem" }}>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="faHeart"
                      onClick={() => {
                        handleWishlist(product._id);
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
                                (product.list[0].price *
                                  product.list[0].offer) /
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
                          // onClick={() => {
                          //   setCart([...cart, product]);
                          //   localStorage.setItem(
                          //     "cart",
                          //     JSON.stringify([...cart, product])
                          //   );
                          //   toast.success(
                          //     `${product.name} has been added to cart`
                          //   );
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
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default WishList;
