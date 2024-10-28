import { useState } from "react";

function EditProductForm({ productData, onSubmit }) {
  const [product, setProduct] = useState(productData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(product); 
  };

  return (
    <form className="product-form" onSubmit={submitHandler}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={product.name} 
            onChange={handleInputChange} 
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image URL
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image URL here"
            value={product.image} 
            onChange={handleInputChange} 
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={product.price} 
            onChange={handleInputChange} 
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter description here"
            value={product.description} 
            onChange={handleInputChange} 
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;
