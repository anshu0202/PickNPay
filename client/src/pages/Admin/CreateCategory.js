import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../../services/ProductApi";
import CategoryForm from "../../components/Form/CategoryForm";
import { toast } from "react-hot-toast";

import { Modal } from "antd"

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [visible,setVisible]=useState(false); 

  const [selected, setSelected]=useState(null);
  const [updatedName, setUpdatedName]=useState("");

  //handle form

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await createCategory(name);

      console.log("new data ",data);
      if (data?.success) {
        toast.success(`${name} is created successfully`);
        getAllCat();
        setName("")
      } 
    } catch (error) {
      console.log("Error while creating new category ", error.message);
      toast.error("Something went wrong while adding category");
    }
  };

  const handleDelete= async(id, name)=>{

       try{
            const data= await deleteCategory(id);
            if(data.success){
              toast.success(`${name} deleted successfully`)
              getAllCat();
              setName("")
            }
       }
       catch(error){
        console.log("Error while deleting  category ",error.message);
        toast.error("Error while deleting category ", error.message);
       }

  }

  const handleUpdate= async(e)=>{
    e.preventDefault();

    try{

      const data=await updateCategory(selected._id,{
        name:updatedName
      })

      if(data.success){
        toast.success("Category updated successfully ")
        setSelected(null);
        getAllCat();
        setUpdatedName("");
        setVisible(false);
      }

    }
    catch(error){
      console.log("error while updating category ", error.message);
      toast.error(`Error while updating category ${error.message}`)
    }

  }

  const getAllCat = async () => {
    const data = await getAllCategory();
    if (data?.success) {
      setCategories(data?.category);
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  return (
    <Layout title={"Create-Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="admin-dashboard-category">
            <AdminMenu />
          </div>

          <div className="col-md-9 category-form">
            <div className="p-3 w-50" style={{margin:"auto"}}>
            <h1 className="text-center">Manage Category</h1>
              <CategoryForm
                value={name}
                handleSubmit={handleSubmit}
                setvalue={setName}
              />
            </div>
            <div className="w-75" style={{margin:"auto"}} >
              <table className="table">
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
                        
                      
                        <td >{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id, c.name)}} >Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
            <CategoryForm value={updatedName} setvalue={setUpdatedName}  handleSubmit={handleUpdate} />

            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
