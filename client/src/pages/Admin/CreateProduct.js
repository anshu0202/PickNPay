import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { createProduct, getAllCategory } from "../../services/ProductApi";

import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../../src/style/adminStyle/adminMenu.css";
import ProductSpecification from "./ProductSpecification";

//It helps to create drop down menu
const { Option } = Select;

const CreateProduct = () => {
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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (description.length < 40) {
        toast.error("Description of product should be more than 40 words");
        return;
      }

      // console.log("list item are ",list);

      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("description", description);
      productData.append("shipping", shipping);
      productData.append("category", category);
      productData.append("subCategory", selectedSub);
      productData.append("photo", photo);
      productData.append("pic2", pic2);
      productData.append("list", JSON.stringify(list));
      // console.log("pro fdata ",selectedSub)

      const data = await createProduct(productData);
      // const data={};
      console.log("dayta osn ", data);

      if (data?.success) {
        toast.success("Product created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Error while creating new product ", error.message);
      toast.error("Error while creating new product ", error.message);
    }
  };

  return (
    <>
      <Layout title={"Create-Product"}>
        <div className="admin-dashboard-product">
          <AdminMenu />
          <div className="admin-dashboard-product-content">
            <h1 className="text-center">Create New Product</h1>
            <div className="admin-pro-form">
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                    getSubCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {" "}
                      {c.name}
                    </Option>
                  ))}
                </Select>
                {subCategory?.length > 0 && (
                  <Select
                    bordered={false}
                    placeholder="Select sub-category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setSelectedSub(value);
                    }}
                  >
                    {subCategory?.map((c, index) => (
                      <Option key={index} value={c}>
                        {" "}
                        {c}
                      </Option>
                    ))}
                  </Select>
                )}
                <div className="mb-3 text-center admin-image-list">
                  <label className="btn btn-outline-secondary col-md-6">
                    {photo ? photo.name : "Upload 1st image of product"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                  <label className="btn btn-outline-secondary col-md-6">
                    {pic2 ? photo.name : "Upload 2nd image of product"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPic2(e.target.files[0])}
                      hidden
                    />
                  </label>
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
                  {pic2 && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(pic2)}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Product Name"
                    className="form-control"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Product Description"
                    className="form-control"
                    style={{
    height: `${Math.min(250, Math.max(100, description.split('\n').length * 20))}px`
  }}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>

                <ProductSpecification
                  list={list}
                  setList={setList}
                  subCategory={subCategory}
                />
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Product Shipping"
                    size="large"
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option key="1" value="0">
                      {" "}
                      No{" "}
                    </Option>
                    <Option key="2" value="1">
                      {" "}
                      Yes{" "}
                    </Option>
                  </Select>
                </div>
                <div className="mb-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary "
                    onClick={(e) => {
                      handleCreate(e);
                    }}
                  >
                    Create Product
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

export default CreateProduct;
