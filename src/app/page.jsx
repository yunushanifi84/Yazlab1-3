"use client"
import "./page.css";
import { useState } from "react";
import image from "@/images/pc.png";
import ProductCard from "@/components/ProductCard";
export default function Home() {

  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", description: "Description for product 1", price: "$10.00", image: image },
    { id: 2, name: "Product 2", description: "Description for product 2", price: "$20.00", image: image },
    { id: 3, name: "Product 3", description: "Description for product 3", price: "$30.00", image: image },
    { id: 4, name: "Product 4", description: "Description for product 4", price: "$40.00", image: image },
    { id: 5, name: "Product 1", description: "Description for product 1", price: "$10.00", image: image },
    { id: 6, name: "Product 2", description: "Description for product 2", price: "$20.00", image: image },
    { id: 7, name: "Product 3", description: "Description for product 3", price: "$30.00", image: image },
    { id: 8, name: "Product 4", description: "Description for product 4", price: "$40.00", image: image },
    { id: 9, name: "Product 1", description: "Description for product 1", price: "$10.00", image: image },
    { id: 10, name: "Product 2", description: "Description for product 2", price: "$20.00", image: image },
    { id: 11, name: "Product 3", description: "Description for product 3", price: "$30.00", image: image },
    { id: 12, name: "Product 4", description: "Description for product 4", price: "$40.00", image: image },
  ]);


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
