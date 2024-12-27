"use client"
import "./page.css";
import ProductCard from "@/components/ProductCard";
import { useEffect ,useState} from "react";
import axios from "axios";
export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);



  return (
    <div className="main-container">
      <div className="products-section">
        {products &&
          <ProductCard products={products} />
        }
      </div>
    </div>

  );
}
