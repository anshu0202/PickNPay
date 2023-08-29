import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ProductSpecification2 = ({ list, setList, subCategory }) => {
  const [newProduct, setNewProduct] = useState({
    size: "",
    price: "",
    offer: "",
    percentage: "",
    quantity: "",
  });

  const handleAddProduct = () => {
    // Validate the new product details
    if (!newProduct.size || !newProduct.price || !newProduct.quantity) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Add the new product to the list
    setList([...list, newProduct]);

    // Clear the form fields
    setNewProduct({
      size: "",
      price: "",
      offer: "",
      percentage: "",
      quantity: "",
    });
  };

  const handleEditProduct = (index) => {
    // Find the product at the specified index
    const productToEdit = list[index];

    // Update the form fields with the product's data
    setNewProduct({
      size: productToEdit.size,
      price: productToEdit.price,
      offer: productToEdit.offer,
      percentage: productToEdit.percentage,
      quantity: productToEdit.quantity,
    });
  };

  return (
    <div className="admin-pro-desc">
      {/* ... Other form elements ... */}
      {/* New product input fields */}
      <div className="item-group">
        {/* Loop through existing products */}
        {list.map((product, index) => (
          <div className="item" key={index}>
            <div className="item-info">
              <div>Size: {product.size}</div>
              <div>Price: {product.price}</div>
              <div>Quantity: {product.quantity}</div>
              <div>Offer: {product.offer}</div>
              <div>Percentage: {product.percentage}</div>
              <div className="btn-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEditProduct(index)}
                >
                  Edit
                </button>
                {/* Add a Delete button if needed */}
              </div>
            </div>
          </div>
        ))}

        {/* New product input fields */}
        <div className="item">
          <input
            type="text"
            placeholder="Size"
            className="form-control"
            value={newProduct.size}
            onChange={(e) =>
              setNewProduct({ ...newProduct, size: e.target.value })
            }
          />
        </div>
        <div className="item">
          <input
            type="number"
            placeholder="Price"
            className="form-control"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="item">
          <input
            type="number"
            placeholder="Offer"
            className="form-control"
            value={newProduct.offer}
            onChange={(e) =>
              setNewProduct({ ...newProduct, offer: e.target.value })
            }
          />
        </div>
        <div className="item">
          <input
            type="number"
            placeholder="Percentage"
            className="form-control"
            value={newProduct.percentage}
            onChange={(e) =>
              setNewProduct({ ...newProduct, percentage: e.target.value })
            }
          />
        </div>
        <div className="item">
          <input
            type="number"
            placeholder="Quantity"
            className="form-control"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
          />
        </div>
        <button className="item-btn" onClick={handleAddProduct}>
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductSpecification2;
