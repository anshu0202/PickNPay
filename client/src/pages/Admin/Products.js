import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";

import { getAllProducts } from "../../services/ProductApi";
import "../../../src/style/adminStyle/adminMenu.css";

import { Link } from "react-router-dom";

import { Checkbox } from "antd";

const Product = () => {
  const [products, setProducts] = useState([]);
  const URL = process.env.REACT_APP_API;

  const getProductList = async () => {
    try {
      const data = await getAllProducts();

      console.log("data is  get all  ", data);
      if (data?.success) {
        setProducts(data?.products);
      } else {
        toast.error("Error while getting all products ");
      }
    } catch (error) {
      console.log("Error while getting all products ", error.message);
      toast.error("Error while getting Products list ", error.message);
    }
  };
  useEffect(() => {
    getProductList();
  }, []);

  return (
    
    <Layout>
      <div className="admin-dashboard-product">
        <AdminMenu />
        <div className="admin-dashboard-product-content">
          <h1 className="text-center">All Products</h1>
          <div className="admin-pro-list">
            {products?.map((product) => (
              <Link
                className="product-link"
                key={product._id}
                to={`/dashboard/admin/products/${product.slug}`}
              >
                {/* <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${URL}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div> */}
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${URL}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }} // Set a fixed height for the image
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="row container-fluid m-3 p-3"> */}
      {/* <div className="col-md-3 ">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
              <Link
                className="product-link"
                key={product._id}
                to={`/dashboard/admin/products/${product.slug}`}
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${URL}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default Product;
