import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

import useRazorpay from "react-razorpay";

import "../style/cartPage.css";

import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import CartComponent from "./CartComponent";
import { setPaymentProducts } from "../services/ProductApi";

const CartPage = () => {
  const URL = process.env.REACT_APP_API;

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [Razorpay] = useRazorpay();




  const [instance, setInstance] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price*item.quantity -(item.price*item.offer*item.quantity)/100;
      });
      return total;
    } catch (error) {
      console.log("Error while calculating total price ", error.message);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log("Error while deleting  cart items ", error.message);
    }
  };



  //get payement gateway token

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log("Error while getting payment token ", error.message);
      toast.error("Error while getting payment token ", error.message);
    }
  };

  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();

  //     const { data } = await axios.post(
  //       `${URL}/api/v1/product/braintree/payment`,
  //       {
  //         nonce,
  //         cart,
  //       }
  //     );

  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Order placed successfully");
  //   } catch (error) {
  //     console.log("Error while payment ", error.message);
  //     toast.error("Error while payment ", error.message);
  //     setLoading(false);
  //   }
  // };

  const handleOnlinePayment = async (id) => {
    let total = 0;
    cart?.map((item) => {
      total = total + item.price*item.quantity -(item.price*item.offer*item.quantity)/100;
    });
    const amountInRupees = total * 100;
    const paymentDetails = {
      amount: amountInRupees, // Amount in smallest currency unit (e.g., cents)
      currency: "INR", // Currency code
    };

    try {
      const response = await axios.post(
        `${URL}/api/v1/product/razorpay/payment`,
        {
          cart,
        }
      );

      // const { orderId } = await response.json();

      const orderId = response.data;
      console.log("rofder is ", orderId);

      // Initialize the Razorpay checkout
      const options = {
        key: "rzp_test_IEOm6xzfDCFWYm",
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        name: "PICK-N-PAY",
        description: "Order Payment",
        order_id: orderId,
        handler:  async function (response) {
          // This function will be called when the payment is successful
          console.log("Payment successful!", response);
          // localStorage.removeItem("cart");
          //     setCart([]);
          //     navigate("/dashboard/user/orders");
          //     toast.success("Order placed successfully");

          const data=await setPaymentProducts({cart,payment:response.razorpay_payment_id})

          console.log("data is ",data);


        },
        prefill: {
          email: "araj6205444@gmail.com",
          contact: "8210880450",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error.message);
      // Handle payment error
    }
  };

  return (
    <Layout>
      <div className="container cart-page">
        <div className="row ">
          <div className="col-md-12 ">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart?.length} items in cart  ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : `Your cart is empty`}
            </h4>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-8 cart-container ">
            {cart?.map((product) => (

                <CartComponent product={product}  removeCartItem={removeCartItem}/>

            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2 className="text-center">Cart Summary </h2>
            <hr />
            <p>Total | Checkout | Payment</p>
            <h4>Toatl amount : ₹ {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current address </h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    navigate("/login", {
                      state: "/cart",
                    });
                  }}
                >
                  Please login to checkout
                </button>
              </>
            )}

            <button
              className="btn btn-primary"
              onClick={handleOnlinePayment}
              disabled={loading}
            >
              {" "}
              {loading ? "Processing ..." : "Make Payment"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

// {
//   !clientToken || !cart?.length ? (
//   ""
// ) : (
//   <>
//     <div className="mt-2">
//       <DropIn
//         options={{
//           authorization: clientToken,
//           paypal: {
//             flow: "vault",
//           },
//           googlePay: {
//             flow: "vault",
//           },
//         }}
//         onInstance={(instance) => setInstance(instance)}
//       />
//       <button
//         className="btn btn-primary"
//         onClick={handlePayment}
//         disabled={loading}
//       >
//         {" "}
//         {loading ? "Processing ..." : "Make Payment"}
//       </button>
//     </div>
//   </>
// )
// }
