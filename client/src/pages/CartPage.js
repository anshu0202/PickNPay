import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';


import DropIn from "braintree-web-drop-in-react";
import { toast } from 'react-hot-toast';
import axios from 'axios';


const CartPage = () => {
    const URL = process.env.REACT_APP_API;

    const [auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();

    const [instance,setInstance]= useState("");

    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const [clientToken,setClientToken]=useState("")

    const totalPrice=()=>{
        try{
            let total =0;
            cart?.map(item=> {total=total+item.price})
            return total
        }
        catch(error){
            console.log("Error while calculating total price ", error.message);
        }
    }

    const removeCartItem=(pid)=>{
            try{
                    let myCart=[...cart];
                    let index=myCart.findIndex(item=> item._id===pid)
                    myCart.splice(index,1);
                    setCart(myCart)
                    localStorage.setItem('cart',JSON.stringify(myCart));
            }
            catch(error){
                console.log("Error while deleting  cart items ",error.message);
            }
    }


    //get payement gateway token

    const getToken= async()=>{
        try{
            const {data}=await axios.get(`${URL}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);
        }
        catch(error){
            console.log("Error while getting payment token ",error.message);
            toast.error("Error while getting payment token ",error.message)
        }
    }


    useEffect(()=>{
        getToken();
    },[auth?.token])


    const handlePayment=async()=>{
         try{

                setLoading(true)
                const {nonce}= await instance.requestPaymentMethod();

                const {data}=await axios.post(`${URL}/api/v1/product/braintree/payment`,{
                    nonce, cart
                })
             setLoading(false);
             localStorage.removeItem("cart")
             setCart([])
                    navigate('/dashboard/user/orders')
                    toast.success("Order placed successfully")
         }
         catch(error){
            console.log("Error while payment ",error.message);
            toast.error("Error while payment ",error.message);
            setLoading(false)
         }

    }





  return (
    <Layout>
    <div className="container">
        <div className="row">
        <div className="col-md-12">
            <h1 className='text-center bg-light p-2 mb-1'>

            {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>{cart?.length>0 ?`You have ${cart?.length} items in cart  ${auth?.token?"":"Please Login to checkout"}`:`Your cart is empty`}</h4>
        </div>
        </div>
        <div className='row'>
          <div className="col-md-8">
            {
                cart?.map(product=>(
                    <div className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                        <img src={`${URL}/api/v1/product/product-photo/${product._id}`} style={{width: '120px', height:'120px'}} className="card-img-top" alt={product.name} />
                        </div>
                        <div className="col-md-8">
                            <p>
                                Name: {product.name}
                            </p>
                            <p>
                               Description :  {product.description.substring(0,30)}...
                            </p>
                            <p>₹ Price : {product.price}</p>
                            <button className='btn btn-danger' onClick={()=>{removeCartItem(product?._id)}}>Remove</button>
                        </div>
                    </div>

                ))
            }
          </div>
            <div className="col-md-4 text-center">
                <h2 className='text-center'>Cart Summary </h2>
                <hr />
                <p>Total | Checkout | Payment</p>
                <h4>Toatl amount : ₹   {totalPrice()} </h4>
                    {
                        auth?.user?.address?<>
                                <div className="mb-3">
                                    <h4>Current address </h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning' onClick={()=>{navigate("/dashboard/user/profile")}}>
                                        Update Address
                                    </button>
                                </div>
                        </>:<>
                        <button className='btn btn-outline-warning' onClick={()=>{navigate("/login",{
                            state:"/cart"
                        })}}>
                                        Please login to checkout
                                    </button>

                        </>
                    }

                    {
                        !clientToken || !cart?.length?"":<>
                        <div className="mt-2">
                        <DropIn  options={{authorization: clientToken, paypal:{
                            flow:'vault'
                        },googlePay:{
                            flow:"vault"
                        }}} onInstance={instance=>setInstance(instance)}

                        />
                        <button className='btn btn-primary' onClick={handlePayment} disabled={loading } > {loading?"Processing ...":"Make Payment"}</button>
                    </div>
                        </>
                    }

                   

            </div>
        </div>
    </div>
      
    </Layout>
  )
}

export default CartPage
