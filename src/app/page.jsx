"use client"
import "./page.css";
import { products } from "@/utils/products";
import ProductCard from "@/components/ProductCard";
export default function Home() {




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
