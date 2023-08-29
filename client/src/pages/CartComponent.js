import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faAngleDown} from '@fortawesome/free-solid-svg-icons'

import "../style/cartPage.css";
import { Modal } from "antd";

import { useCart } from "../context/cart";

const CartComponent = ({ product, removeCartItem }) => {
  const URL = process.env.REACT_APP_API;

  const [cart, setCart] = useCart();

  const [visible, setVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [quantity,setQuantity]=useState(1);

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

  // console.log("all cart items are


  useEffect(()=>{
    const existingCartItemIndex = cart.findIndex(
      (item) => item._id === product._id && item.size === selectedSize
    );
    if (existingCartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity = quantity;
      setCart(updatedCart);
    }

  },[quantity])

  const setProductDetails = () => {
    const list = product.list;
    product.productId=product._id
    setSelectedSize(product.size);
    // console.log("list is ", product);
    const len = list?.length;

    for (let i = 0; i < len; i++) {
      var size = list[i]?.size;
    //   console.log("size is ", size);
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
  };

  useEffect(() => {
    if (product !== undefined) {
      setProductDetails();
    }
  }, [product]);

  return (
    <div className="row mb-2 p-2 card flex-row cart-box">
      <div className="col-md-4 cart-img">
        <img
          src={`${URL}/api/v1/product/product-photo/${product._id}`}
          // style={{ width: "120px", height: "120px" }}
          className="card-img-top"
          alt={product.name}
        />
      </div>
      <div className="col-md-8 cart-right">
        <p>Name: {product.name}</p>
        <p>Description : {product.description}</p>
        <div className="pro-price-cart">
          {product.offer === 0 ? (
            <>
              {" "}
              <div className="card-text fp"> ₹ {product.price*quantity} </div>
            </>
          ) : (
            <>
              <div className="card-text fp">
                {" "}
                ₹ {product.price*quantity - (product.price * product.offer*quantity) / 100}{" "}
              </div>
              <div className="card-text sp"> ₹ {product.price*quantity} </div>

              <div className="off"> ( {product.offer} % OFF ) </div>
            </>
          )}
        </div>
        {/* <p>₹ Price : {product?.list[0]?.price}</p> */}
                  
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
        <div className="pro-quantity-cart" onClick={()=>setVisible(true)} >Quantity : &nbsp;
                        {quantity} 

                        <FontAwesomeIcon icon={faAngleDown}  className='faAngleDown'   />
         </div>
        <button
          className="btn btn-danger"
          onClick={() => {
            removeCartItem(product?._id);
          }}
        >
          Remove
        </button>
        <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
             <div className="quantity-modal">
               <h5>Select Quantity </h5>

               <div className="items">

                <div onClick={()=> {setQuantity(1);}} className={`quantity-option ${quantity === 1 ? "selected" : ""}`} >1</div>
                <div onClick={()=>setQuantity(2)} className={`quantity-option ${quantity === 2 ? "selected" : ""}`}>2</div>
                <div onClick={()=>setQuantity(3)} className={`quantity-option ${quantity === 3 ? "selected" : ""}`}>3</div>
                <div onClick={()=>setQuantity(4)} className={`quantity-option ${quantity === 4 ? "selected" : ""}`}>4</div>
                <div onClick={()=>setQuantity(5)} className={`quantity-option ${quantity === 5 ? "selected" : ""}`}>5</div>
                    

                </div>
                
              
             </div>
                
            </Modal>
      </div>
    </div>
  );
};

export default CartComponent;
