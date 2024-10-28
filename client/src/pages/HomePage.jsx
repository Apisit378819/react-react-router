import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";


function HomePage() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const params = useParams()

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios(`http://localhost:4001/products`);
      setProducts(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleClick = () => {
    navigate("/product/create")
  }

  const handleViewClick = (id) => {
    navigate(`/product/view/products/${id}`);  
  };

  const handleEditClick = (id) => {
    navigate(`/product/edit/products/${id}`); 
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      setProducts(products.filter(product => product.id !== id)); 
    } catch (error) {
      setIsError(true);
    }
  };
  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <button onClick={handleClick}>Create Product</button>
      </div>
      <div className="product-list">
        {products.map((product) => {
          return (
            <div className="product"  key={product.id}>
              <div className="product-preview">
                <img
                  src="https://via.placeholder.com/250/250"
                  alt={product.name}
                  width="250"
                  height="250"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name} </h1>
                <h2>Product price: {product.price}</h2>
                <p>Product description: {product.description} </p>
                <div className="product-actions">
                  <button className="view-button"  onClick={() => handleViewClick(product.id)}>View</button>
                  <button className="edit-button" onClick={() => handleEditClick(product.id)}>Edit</button>
                </div>
              </div>

              <button className="delete-button" onClick={() => handleDeleteClick (product.id)}>x</button>
            </div>
          );
        })}
      </div>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default HomePage;
