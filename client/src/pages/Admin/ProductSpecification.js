import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { createProduct, getAllCategory } from "../../services/ProductApi";

import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../../src/style/adminStyle/adminMenu.css";
const ProductSpecification = ({list,setList,subCategory}) => {
  
    // const [category, setCategory] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [size, setSize] = useState();
    const [offer, setOffer] = useState();
  
    const handleAddProduct = () => {
      // Create a new product object
            console.log("type of szie ois ",size)
        if(price===undefined){
            toast.error("Product price cannot be 0");
            return
        }

        if( quantity===undefined || quantity<5){
            toast.error("Product quantity cannot be less than 5");
            return
        }

        if(size===undefined){
            toast.error("Select product size");
            return
        }


      const newProduct = {
        subCategory: subCategory,
        price: price,
        quantity: quantity,
        size: size,
        offer:offer
      };
  
      // Add the new product to the list
      setList([...list, newProduct]);
  
      // Clear the form fields
    //   setCategory('');
      setPrice('');
      setQuantity('');
      setOffer('');
      setSize('');
    };

  

    const handleSizeChange = (event) => {
      setSize(event.target.value);
    // setSize(e)
    };




  return (
    <>

   
    <div className="admin-pro-desc"> 
      
      <div className="pro-size">
      <select
            className="form-select"
            id="size"
            value={size}
            onChange={handleSizeChange}
          >
            <option value="">Select a size</option>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
            <option value="xl">Extra Large</option>
            <option value="A">One Size</option>
          </select>
      </div>
                
            <div className="item-group">   
      <div className="item">
                  <input
                    type="number"
                    value={price}
                    placeholder="Price"
                    className="form-control"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="item">
                  <input
                    type="number"
                    value={offer}
                    placeholder="Offer"
                    className="form-control"
                    onChange={(e) => {
                      setOffer(e.target.value);
                    }}
                  />
                </div>
              
                <div className="item">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Quantity"
                    className="form-control"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
                <button className="item-btn" onClick={handleAddProduct}>
                  Add
                </button>
                </div> 
      
    </div>
   
    </>
  )
}

export default ProductSpecification
