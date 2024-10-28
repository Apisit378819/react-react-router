import CreateProductForm from "../components/CreateProductForm";
import { useParams,useNavigate } from "react-router-dom";

function CreateProductPage() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
  }
  const getProductDetails = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.post(`http://localhost:4001/products/${id}`);
      setProduct(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };
  return (
    <div>
      <h1>Create Product Page</h1>
      <CreateProductForm />
      <button onClick={handleClick}>Back to Home</button>
    </div>
  );
}

export default CreateProductPage;
