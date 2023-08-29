// import React, { useState } from "react";
// import { toast } from "react-hot-toast";

// const CategoryEdit = ({
//   handleSubmit,
//   value,setvalue,
//     name,setName,
//   setSubCategory,
//   subCategory,
// }) => {
//   const [subCatName, setSubCatName] = useState("");

//   console.log("name is ",name," sub cat ",subCategory)

//   const handleAdd = (e) => {
//     e.preventDefault();
//     if (subCatName === "") {
//       toast.error("Enter sub-category name");
//       return;
//     }
//     setSubCategory([...subCategory, subCatName]);
//     setSubCatName("");
//   };

//   const handleChange=(name,index)=>{

//   }

//   const deleteSubCat = (e, index) => {
//     e.preventDefault();
//     const newSubCategory = [...subCategory];
//     newSubCategory.splice(index, 1);
//     setSubCategory(newSubCategory);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="">
//         {/* <div className="cat-input">
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control cat-input-data"
//               placeholder="Enter new Category"
//               value={value}
//               onChange={(e) => setvalue(e.target.value)}
//             />
//           </div>
//           <div className="mb-3   cat-input-data">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter sub-Category"
//               value={subCatName}
//               onChange={(e) => setSubCatName(e.target.value)}
//             />
//           </div>
//           <button
//             type="text"
//             onClick={(e) => {
//               handleAdd(e);
//             }}
//           >
//             {" "}
//             Add{" "}
//           </button>
//         </div>

//         {subCategory?.length > 0 && (
//           <div className="admin-sub-cat-list">
//             {subCategory?.map((cat, index) => (
//               <>
//                 <div className="item">
//                   <div className="cat-list-item">{cat}</div>
//                   <button
//                     type="text"
//                     className="del-sub-cat"
//                     onClick={(e, index) => {
//                       deleteSubCat(e, index);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             ))}
//           </div>
//         )}

//         <button type="submit" className="cat-create">
//           Update
//         </button> */}
//         <div className="cat-update-form">
//         <div className="d-flex ">
//         <h2>Category:</h2>
//         <input type="text"className="form-control"  value={name} onChange={(e)=>{setName(e.target.value)}} />
//         </div>
            
//              <div className="sub-cat-update">
//                {
//                 subCategory?.map((sub,index)=>(
//                     <div className="item"> 
//                         <input type="text" value={sub}   />
//                       </div>
//                     ))
//                }
//              </div>
             

//              <div className="new-sub-cat">
//              <div>
//                <input type="text" placeholder="new sub-category" />
                
//                 </div>
//                <button>Add Sub-Category</button>
//              </div>

//         </div>
//         <button>Update changes</button>
//       </form>
//     </>
//   );
// };

// export default CategoryEdit;

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CategoryEdit = ({
  handleSubmit,
   handleUpdate,
  name,
  setName,
  setSubCategory,
  subCategory,
}) => {
  const [subCatName, setSubCatName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (subCatName === "") {
      toast.error("Enter sub-category name");
      return;
    }
    setSubCategory([...subCategory, subCatName]);
    setSubCatName("");
  };

  const handleChange = (e, index) => {
    const updatedSubCategory = [...subCategory];
    updatedSubCategory[index] = e.target.value;
    setSubCategory(updatedSubCategory);
  };
  const deleteSubCat = (e, index) => {
    e.preventDefault();
    const newSubCategory = [...subCategory];
    newSubCategory.splice(index, 1);
    setSubCategory(newSubCategory);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sub-Categories</label>
          {subCategory?.map((sub, index) => (
            <div className="input-group mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                value={sub}
                onChange={(e) => handleChange(e, index)}
              />
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={(e) => deleteSubCat(e, index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label className="form-label">New Sub-Category</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new sub-category"
              value={subCatName}
              onChange={(e) => setSubCatName(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={(e) => handleAdd(e)}
            >
              Add
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-success" >
          Update Changes
        </button>
      </form>
    </div>
  );
};

export default CategoryEdit;

