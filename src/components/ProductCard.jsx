import React from 'react'
import Image from "next/image";
import "@/styles/ProductCard.css";
import bufferToBase64 from '@/utils/imageConverter';
export default function ProductCard({ products }) {

    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find((item) => item.ProductID === product._id);
        if (existingProduct) {
            existingProduct.Quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            cart.push({ ProductID: product._id, Quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
        }


    }


    return (


        products.map((product) => (
            <div className="product-card" key={product._id}>
                <div className="product-image">
                    <Image src={bufferToBase64(product.imageStream)} alt="product image" width={250} height={200} style={{ objectFit: "cover" }} />
                </div>
                <div className="product-details">
                    <h3>{product.productName}</h3>
                    <p>{product.description}</p>
                    <p className='price'>{product.price}</p>
                </div>

                <button className="add-button" onClick={() => handleAddToCart(product)}>
                    Sepete Ekle
                </button>
            </div>
        ))

    )
}
