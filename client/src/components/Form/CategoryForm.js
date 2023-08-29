import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CategoryForm = ({
  handleSubmit,
  value,
  setvalue,
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

  const deleteSubCat = (e,index) => {
    e.preventDefault();
    const newSubCategory = [...subCategory];
    newSubCategory.splice(index, 1);
    setSubCategory(newSubCategory);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="admin-cat-form">
        <div className="cat-input">
          <div className="mb-3">
            <input
              type="text"
              className="form-control cat-input-data"
              placeholder="Enter new Category"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            />
          </div>
          <div className="mb-3   cat-input-data">
            <input
              type="text"
              className="form-control"
              placeholder="Enter sub-Category"
              value={subCatName}
              onChange={(e) => setSubCatName(e.target.value)}
            />
          </div>
          <button
            type="text"
            onClick={(e) => {
              handleAdd(e);
            }}
          >
            {" "}
            Add{" "}
          </button>
        </div>

        {subCategory?.length > 0 && (
          <div className="admin-sub-cat-list">
            {subCategory?.map((cat, index) => (
              <>
                <div className="item">
                  <div className="cat-list-item">{cat}</div>
                  <button
                   type="text"
                    className="del-sub-cat"
                    onClick={(e,index) => {
                      deleteSubCat(e,index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            ))}
          </div>
        )}

        <button type="submit" className="cat-create">
          Create
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
