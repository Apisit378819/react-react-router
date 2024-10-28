import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateProductPage from "./pages/CreateProductPage"
import EditProductPage from "./pages/EditProductPage"
import HomePage from "./pages/HomePage"
import ViewProductPage from "./pages/ViewProductPage"

const NoMatch = () => <h1>Page Not Found</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/create" element={<CreateProductPage />} />
        <Route path="/product/edit/products/:id" element={<EditProductPage />} />
        <Route path="/product/view/products/:id" element={<ViewProductPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
