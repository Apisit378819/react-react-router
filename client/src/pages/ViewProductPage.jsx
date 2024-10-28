import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ViewProductPage() {
  const [product, setProduct] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  const getProductDetails = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(`http://localhost:4001/products/${params.id}`);
      setProduct(results.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [params.id]);

  const handleBackClick = () => {
    navigate("/");
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Request failed. Please try again later.</h1>;
  }

  if (!product) {
    return <h1>No product found.</h1>;
  }

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h1>Product name: {product.name}</h1>
        <img src={product.image} alt={product.name} />
        <h2>Product price: {product.price}</h2>
        <p>Product description: {product.description}</p>
      </div>
      <button onClick={handleBackClick}>Back to Home</button>
    </div>
  );
}

export default ViewProductPage;