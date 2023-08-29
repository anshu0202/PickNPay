import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import CategoryEdit from "../../components/Form/CategoryEdit";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../../services/ProductApi";
import CategoryForm from "../../components/Form/CategoryForm";
import { toast } from "react-hot-toast";

import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryUpdated, setSubCategoryUpdated] = useState([]);

  const [name, setName] = useState("");
  // const [uName,setUName]=useState("")

  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (subCategory.length === 0) {
        toast.error(`Add atleast one sub-category of ${name}`);
      }
      console.log("sub category are ", subCategory);
      const { data } = await createCategory({ name, subCategory });
      // const data={};
      console.log("new data ", data);
      if (data?.success) {
        toast.success(`${name} is created successfully`);
        getAllCat();
        setName("");
        setSubCategory([])
      }
    } catch (error) {
      console.log("Error while creating new category ", error.message);
      toast.error("Something went wrong while adding category");
    }
  };

  const handleDelete = async (id, name) => {
    try {
      const data = await deleteCategory(id);
      if (data.success) {
        toast.success(`${name} deleted successfully`);
        getAllCat();
        setName("");
      }
    } catch (error) {
      console.log("Error while deleting  category ", error.message);
      toast.error("Error while deleting category ", error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const data = await updateCategory(selected._id, {
        name: updatedName,
        subCategory:subCategoryUpdated
      });

      if (data.success) {
        
        toast.success("Category updated successfully ");
        setSelected(null);
        getAllCat();
        setUpdatedName("");
        setVisible(false);
      }
    } catch (error) {
      console.log("error while updating category ", error.message);
      toast.error(`Error while updating category ${error.message}`);
    }
  };

  const getAllCat = async () => {
    const data = await getAllCategory();
    if (data?.success) {
      setCategories(data?.category);
        console.log("all category are ",data)

    }
  };

  const handleEdit=(Catname,list)=>{
    console.log("list is ",list)
    setUpdatedName(Catname)
    setSubCategoryUpdated(list)
     

  }
  useEffect(() => {
    getAllCat();
  }, []);

  return (
    <Layout title={"Create-Category"}>
      <div className="container-fluid  p-5 ">
      <div className="admin-dashboard-category">
            <AdminMenu />
          </div>

        <div className="row admin-cat-page">
         
          <div className="category-form" style={{ padding:"2rem"}}> 
            <div className="admin-category-form" >
              <h1 className="text-center">Manage Category</h1>
              <CategoryForm
                value={name}
                handleSubmit={handleSubmit}
                setvalue={setName}
                setSubCategory={setSubCategory}
                subCategory={subCategory}
              />
            </div>

            <div className="w-75 admin-cat-list" style={{ margin: "auto" }} >
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c, index) => (
                    <>
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                              handleEdit(c.name,c.subCategory)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id, c.name);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
             
                <CategoryEdit name={updatedName} subCategory={subCategoryUpdated} setName={setUpdatedName} setSubCategory={setSubCategoryUpdated} handleUpdate={handleUpdate} />

            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
