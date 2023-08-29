import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getSimilarProducts, getSingleProduct } from "../services/ProductApi";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../context/cart";

import { toast } from "react-hot-toast";

import "../style/productDetails.css";
import { useWishList } from "../context/wishlist";

const PorductDetails = () => {
  const URL = process.env.REACT_APP_API;

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(0);

  let [proSize, setProSize] = useState({
    small: false,
    medium: false,
    large: false,
    xLarge: false,
  });

  let [proPrice, setProPrice] = useState({
    small: 0,
    medium: 0,
    large: 0,
    xLarge: 0,
  });

  let [proOffer, setProOffer] = useState({
    small: 0,
    medium: 0,
    large: 0,
    xLarge: 0,
  });

  const { slug } = useParams();

  const [cart, setCart] = useCart();
  const [wishList, setWishList] = useWishList();

  const getProduct = async () => {
    try {
      const data = await getSingleProduct(slug);

      if (data?.success) {
        // console.log("data prov ndje ", data?.product?.list[0].offer);
        setProduct(data?.product);
        setSelectedSize(data.product.list[0].size);
        setSelectedPrice(data.product.list[0].price);
        setSelectedOffer(data.product.list[0].offer);
        // console.log("fii ",/)
        const list = data.product.list;
        // console.log("list is ", list);
        const len = list.length;

        for (let i = 0; i < len; i++) {
          var size = list[i].size;
          console.log("size is ", size);
          if (size === "s") {
            setProSize((prevSize) => ({ ...prevSize, small: true }));
            setProPrice((prevPrice) => ({
              ...prevPrice,
              small: list[i].price,
            }));
            setProOffer((prevOffer) => ({
              ...prevOffer,
              small: list[i].offer,
            }));
          } else if (size === "l") {
            setProSize((prevSize) => ({ ...prevSize, large: true }));
            setProPrice((prevPrice) => ({
              ...prevPrice,
              large: list[i].price,
            }));
            setProOffer((prevOffer) => ({
              ...prevOffer,
              large: list[i].offer,
            }));
          } else if (size === "m") {
            setProSize((prevSize) => ({ ...prevSize, medium: true }));
            setProPrice((prevPrice) => ({
              ...prevPrice,
              medium: list[i].price,
            }));
            setProOffer((prevOffer) => ({
              ...prevOffer,
              medium: list[i].offer,
            }));
          } else if (size === "xl") {
            setProSize((prevSize) => ({ ...prevSize, xLarge: true }));
            setProPrice((prevPrice) => ({
              ...prevPrice,
              xLarge: list[i].price,
            }));
            setProOffer((prevOffer) => ({
              ...prevOffer,
              xLarge: list[i].offer,
            }));
          }
        }

        //  console.log("pro size ",proSize)

        getSimiPro(data?.product?._id, data?.product?.category?._id);
      }
    } catch (error) {
      console.log("Error while getting single product ", error.message);
    }
  };

  useEffect(() => {
    if (slug !== undefined) getProduct();
  }, [slug]);

  // const handleAddToCart = () => {

  //   const newCartItem = {
  //     _id: product._id, // Assuming you have a product ID
  //     size: selectedSize,
  //     price: selectedPrice,
  //     quantity: 1,
  //     offer: selectedOffer,
  //     // Other relevant product details
  //   };

  //   setCart((prevCart) => [...prevCart, newCartItem]);
  //   localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
  //   toast.success(`${product.name} has been added to cart`);
  // };

  const handleAddToCart = () => {
    // Check if the same product with the same size is already in the cart

    // console.log("producvt is ", product);
    const existingCartItem = cart.find(
      (item) => item._id === product._id && item.size === selectedSize
    );

    if (existingCartItem) {
      // Product with the same ID and size is already in the cart
      // You can update the quantity, show a message, or take other actions
      // toast.custom(`${product.name} is already in the cart with the selected size.`);
      toast.success(`${product.name} has been added to cart.`);
      return;
    }

    

    // If not already in the cart, add the new cart item
    const newCartItem = {
      _id: product._id,
      size: selectedSize,
      price: selectedPrice,
      quantity: 1,
      offer: selectedOffer,
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

  const getSimiPro = async (pid, cid) => {
    try {
      const data = await getSimilarProducts(pid, cid);
      setRelatedProducts(data.products);
    } catch (error) {
      console.log("Error while getting similar products ", error.message);
    }
  };

  const handleWishlist = (product) => {
    setWishList([...wishList, product]);
    localStorage.setItem("wishList", JSON.stringify([...wishList, product]));
    toast.success(`${product.name} has been added to wishlist`);
  };

  return (
    <Layout>
      {product === undefined ||
      product?.list === undefined ||
      loading === true ? (
        <></>
      ) : (
        <>
          <div className="product-details">
            <div className="col-md-6 left">
              {product !== undefined && (
                <>
                  <img
                    src={`${URL}/api/v1/product/product-photo/${product?._id}`}
                    style={{ width: "20rem" }}
                    height="400"
                    className="card-img-top"
                    alt={product?.name}
                  />
                  <img
                    src={`${URL}/api/v1/product/product-pic/${product?._id}`}
                    style={{ width: "20rem" }}
                    height="400"
                    className="card-img-top"
                    alt={product?.name}
                  />
                </>
              )}
            </div>
            <div className="col-md-6 right">
              <h4 style={{ textTransform: "uppercase" }}> {product.name}</h4>
              <h4 style={{ color: "gray" }}>{product.description}</h4>

              {/* <div className="product-price">
            <h6>Price : ₹ {product.price} </h6>
            <h6> MRP ₹ {product.price - 500} </h6>
            <h6>Price : (10 % OFF) </h6>
          </div> */}

              <div className="pro-price-detail">
                {product?.list[0].offer === 0 ? (
                  <>
                    <div className="card-text fp">
                      {" "}
                      ₹ {product?.list[0].price}{" "}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-text fp">
                      {" "}
                      ₹{" "}
                      {product?.list[0].price -
                        (product.list[0].price * product.list[0].offer) /
                          100}{" "}
                    </div>
                    <div className="card-text sp">
                      {" "}
                      ₹ {product?.list[0].price}{" "}
                    </div>
                    <div className="off">
                      {" "}
                      ({product?.list[0].offer} % OFF ){" "}
                    </div>
                  </>
                )}
              </div>
              <h6 style={{ color: "green" }}>Inclusive of all taxes</h6>

              <h6>Category : {product?.category?.name} </h6>
              <h6>Select size : </h6>
           
<div className="size-section">
  {product?.list[0].size === "A" ? (
    <div
      className={`size-option ${
        selectedSize === "A" ? "selected-size" : ""
      }`}
      style={{
        height: "4rem",
        width: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      One Size
    </div>
  ) : (
    <>
      {proSize.small === true ? (
        <div
          className={`size-option ${selectedSize === "s" ? "selected-size" : ""}`}
          onClick={() => {
            setSelectedSize("s");
            setSelectedPrice(proPrice.small);
            setSelectedOffer(proOffer.small);
          }}
        >
          S
        </div>
      ) : (
        <></>
      )}

      {proSize.medium === true ? (
        <div
          className={`size-option ${selectedSize === "m" ? "selected-size" : ""}`}
          onClick={() => {
            setSelectedSize("m");
            setSelectedPrice(proPrice.medium);
            setSelectedOffer(proOffer.medium);
          }}
        >
          M
        </div>
      ) : (
        <></>
      )}

      {proSize.large === true ? (
                      <div
                      className={`size-option ${selectedSize === "l" ? "selected-size" : ""}`}
                        onClick={() => {
                          
                          setSelectedSize("l");
                          setSelectedPrice(proPrice.large);
                          setSelectedOffer(proOffer.large);
                        }}
                      >
                        L
                      </div>
                    ) : (
                      <></>
                    )}
                    {proSize.xLarge === true ? (
                      <div
                      className={`size-option ${selectedSize === "xl" ? "selected-size" : ""}`}
                        onClick={() => {
                          setSelectedSize("xl");
                          setSelectedPrice(proPrice.xLarge);
                          setSelectedOffer(proOffer.xLarge);
                        }}
                      >
                        XL
                      </div>
                    ) : (
                      <></>
                    )}


    
    </>
  )}
</div>



              {/* <div className="size-section">
                {product?.list[0].size === "A" ? (
                  <div
                    style={{
                      height: "4rem",
                      width: "4rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2rem",
                    }}
                  >
                    One Size
                  </div>
                ) : (
                  <>
                    {proSize.small === true ? (
                      <div
                        onClick={() => {
                          setSelectedSize("s");
                          setSelectedPrice(proPrice.small);
                          setSelectedOffer(proOffer.small);
                        }}
                      >
                        S
                      </div>
                    ) : (
                      <></>
                    )}

                    {proSize.medium === true ? (
                      <div
                        onClick={() => {
                          setSelectedSize("m");
                          setSelectedPrice(proPrice.medium);
                          setSelectedOffer(proOffer.medium);
                        }}
                      >
                        M
                      </div>
                    ) : (
                      <></>
                    )}
                    {proSize.large === true ? (
                      <div
                        onClick={() => {
                          setSelectedSize("l");
                          setSelectedPrice(proPrice.large);
                          setSelectedOffer(proOffer.large);
                        }}
                      >
                        L
                      </div>
                    ) : (
                      <></>
                    )}
                    {proSize.xLarge === true ? (
                      <div
                        onClick={() => {
                          setSelectedSize("xl");
                          setSelectedPrice(proPrice.xLarge);
                          setSelectedOffer(proOffer.xLarge);
                        }}
                      >
                        XL
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div> */}

              <div className="card-btn-pro-detail">
                <button
                  className="card-btn-add"
                  style={{ fontSize: "1.5rem", padding: "0.5rem" }}
                  onClick={() => {
                    handleAddToCart();
                  }}
                >
                  <FontAwesomeIcon icon={faCartShopping} /> &nbsp; Add to cart
                </button>
                <button
                  className="card-btn-add"
                  style={{ fontSize: "1.5rem", padding: "0.5rem" }}
                  onClick={() => {
                    handleWishlist(product);
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} /> &nbsp; Wishlist
                </button>
              </div>
            </div>
          </div>

          {relatedProducts?.length >= 1 && (
            <>
              <div className="similar-products">
                <hr />
                <h5>Similar products</h5>

                <div className="d-flex flex-wrap pro-card-details">
                  {relatedProducts?.map((product) => (
                    <div
                      className="card m-2 card-box"
                      style={{ width: "17rem" }}
                    >
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
                          {product?.list[0].offer === 0 ? (
                            <>
                              <div className="card-text fp">
                                {" "}
                                ₹ {product?.list[0].price}{" "}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="card-text fp">
                                {" "}
                                ₹{" "}
                                {product?.list[0].price -
                                  (product?.list[0].price *
                                    product?.list[0].offer) /
                                    100}{" "}
                              </div>
                              <div className="card-text sp">
                                {" "}
                                ₹ {product?.list[0].price}{" "}
                              </div>

                              <div className="off">
                                {" "}
                                ( {product?.list[0].offer} % OFF ){" "}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default PorductDetails;
