import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  createProduct,
  deleteProduct,
  getAllCategory,
  getSingleProduct,
  updateProduct,
} from "../../services/ProductApi";

import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "../../../src/style/adminStyle/adminMenu.css";
import ProductSpecification from "./ProductSpecification";
import ProductSpecification2 from "./ProductSpecification2";

import "../../style/updateProduct.css";

//It helps to create drop down menu
const { Option } = Select;

const UpdateProduct = () => {
  const URL = process.env.REACT_APP_API;
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [list, setList] = useState([]);
  const [photo, setPhoto] = useState("");
  const [pic2, setPic2] = useState("");
  const [name, setName] = useState("");

  const [category, setCategory] = useState();

  // const [subCategory,setSubCategory]=useState([]);

  const [price, setPrice] = useState("100 ");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1000");
  const [shipping, setShipping] = useState("");
  const [items, setItems] = useState([]);
  const [pro, setPro] = useState();

  const [id, setId] = useState("");

  const params = useParams();

  const navigate = useNavigate();

  const getSubCategory = async (cate) => {
    console.log("cate ", cate);
    const selectedCategory = categories.find((c) => c._id === cate);
    if (selectedCategory) {
      setSubCategory(selectedCategory.subCategory);
    }
  };

  const getAllCat = async () => {
    const data = await getAllCategory();
    if (data?.success) {
      setCategories(data?.category);
      setSubCategory(data?.subCategory);
    }
  };
  useEffect(() => {
    getAllCat();
  }, []);

  //create product function



  const handleUpdateSubItem = (index, property, value) => {
    // Update the state with the modified property value
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index][property] = value;
      return newItems;
    });
  };

  /// yaha se copy

  const getSinglePro = async () => {
    try {
      const data = await getSingleProduct(params.slug);

      if (data?.success) {
        // console.log("pro data idsd edjk k---> ",data.product)
        setName(data.product.name);
        setCategory(data.product.category._id);
        setDescription(data.product.description);
        setItems(data.product.list);
        setList(data.product.list);

        setPro(data.product);
        // console.log("reojgkn ",pro)

        setShipping(data.product.shipping);
        setId(data.product._id);
      }
    } catch (error) {
      console.log("Error while getting single product ", error.message);
    }
  };

  useEffect(() => {
    getSinglePro();
    getAllCat();
    //eslint-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      //   const productData= new FormData();
      //   productData.append("name",name);
      //   productData.append("price", price);
      //   productData.append("quantity",quantity);
      //   productData.append("description",description)
      //   productData.append("shipping",shipping);
      //   productData.append("category",category);
      //  photo && productData.append("photo",photo);

      const data=await updateProduct(id,{updatedList:items});

      if(data?.success){
        toast.success("Product Updated Successfully");
        // navigate("/dashboard/admin/products")
      }
      else{
        toast.error(data?.message);
      }

    
    } catch (error) {
      console.log("Error while updating product ", error.message);
      toast.error("Error while updating product ", error.message);
    }
  };

  // delete product api

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure to delete this product?");
      if (!answer) return;

      const data = await deleteProduct(id);
      if (data.success) {
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log("Error while deleting product ", error.message);
      toast.error("Error while deleting product ", error.message);
    }
  };

  return (
    <>
      <Layout title={"Update-Product"}>
        <div className="admin-dashboard-product">
          <AdminMenu />
          <div className="admin-dashboard-product-content">
            <h1 className="text-center">Update Product</h1>
            <div className="admin-pro-form">
              <div className="m-1 w-75">
                <div className="proDetails">
                  <div
                    className="productName"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Category:</strong> {pro?.category.name}
                  </div>
                  <div
                    className="realName"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Sub-Category :</strong> {pro?.subCategory}
                  </div>
                  <div
                    className="realName"
                    style={{ textTransform: "capitalize" }}
                  >
                    <strong>Name :</strong> {pro?.name}
                  </div>
                </div>

                

                <div className="proDetails"></div>

                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${URL}/api/v1/product/product-photo/${id}`}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>

               
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Product Description"
                    className="form-control"
                    style={{
                      height: `${Math.min(
                        300,
                        Math.max(100, description.split("\n").length * 25)
                      )}px`,
                    }}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>

              

                {items.size != 0 ? (
                  <>
                    {
                      <div>
                        {items.size !== 0 ? (
                          <div className="items-container">
                            <table className="item-table">
                              <thead>
                                <tr>
                                  <th>Size</th>
                                  <th>Price (₹)</th>
                                  <th>Offer (%)</th>
                                  <th>Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {items.map((item, index) => (
                                  <tr key={index}>
                                    <td className="item-input">
                                      <input
                                        type="text"
                                        value={item.size}
                                        readOnly
                                        // onChange={(e) => handleUpdateSubItem(index, 'size', e.target.value)}
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="item-input">
                                      <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) =>
                                          handleUpdateSubItem(
                                            index,
                                            "price",
                                            parseFloat(e.target.value)
                                          )
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="item-input">
                                      <input
                                        type="text"
                                        value={item.offer}
                                        onChange={(e) =>
                                          handleUpdateSubItem(
                                            index,
                                            "offer",
                                            e.target.value
                                          )
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="item-input">
                                      <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                          handleUpdateSubItem(
                                            index,
                                            "quantity",
                                            parseInt(e.target.value)
                                          )
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    }
                  </>
                ) : (
                  <></>
                )}

                <div className="mb-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary "
                    onClick={(e) => {
                      handleUpdate(e);
                    }}
                  >
                    Update Product
                  </button>
                </div>
                <div className="mb-3 text-center">
                  <button
                    className="btn btn-danger "
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
