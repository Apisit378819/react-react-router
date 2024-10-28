import { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  const [product, setProduct] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(() => {
    getProductDetails();
  }, [params.id]);
  
  const handleClick = () => {
    navigate("/"); 
  }

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:4001/products/${params.id}`, updatedProduct);
      navigate("/"); 
    } catch (error) {
      setIsError(true); 
    }
  };

  const getProductDetails = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(`http://localhost:4001/products/${params.id}`);
      setProduct(results.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false); 
    }
  };

  if (isLoading) return <div>Loading...</div>; 
  if (isError) return <div>Error loading product details. Please try again.</div>; 

  return (
    <div>
      <h1>Edit Product Page</h1>
      {product ? (
        <EditProductForm productData={product} onSubmit={handleUpdateProduct} />
      ) : (
        <div>Product details not found.</div> 
      )}
      <button onClick={handleClick}>Back to Home</button>
    </div>
  );
}

export default EditProductPage;

