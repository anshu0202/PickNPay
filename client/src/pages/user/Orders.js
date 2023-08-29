import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { getAllOrders } from "../../services/ProductApi";
import { useAuth } from "../../context/auth";
import moment from "moment";

import "../../style/user.css"

const Orders = () => {
  const URL = process.env.REACT_APP_API;

  const [orders, setOrders] = useState([]);

  const [auth] = useAuth();

  const getOrdersList = async () => {
    const data = await getAllOrders();

    console.log("all orders are ", data);
    setOrders(data);
  };

  useEffect(() => {
    if (auth?.token) {
      getOrdersList();
    }
  }, [auth?.token]);

  return (
    <Layout title={"All Order"}>
      <div
        className="user-order"
       
      >
        <div className="row">
         
          <div className="col-md-12">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment!=undefined ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((product) => (
                      <div className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`${URL}/api/v1/product/product-photo/${product?.productId._id}`}
                            style={{ width: "50%", height: "50%" }}
                            className="card-img-top"
                            alt={product.productId.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>Name: {product.productId.name}</p>
                          <p>
                            Description :{" "}
                            {product.productId.description.substring(0, 30)}
                            ...
                          </p>
                          <p>₹ Price : {product.price}</p>
                          <p>Quantity: {product.quantity}</p>

                          <p>
                            Size:{" "}
                            {product.size === "s" ? (
                              <span>Small</span>
                            ) : product.size === "m" ? (
                              <span>Medium</span>
                            ) : product.size === "l" ? (
                              <span>Large</span>
                            ) : product.size === "xl" ? (
                              <span>Extra-large</span>
                            ) : (
                              <span>Unknown</span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
