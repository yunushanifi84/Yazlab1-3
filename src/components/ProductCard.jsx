import React from 'react'
import Image from "next/image";
import "@/styles/ProductCard.css";
export default function ProductCard({ products }) {

    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            cart.push({ id: product.id, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
        }


    }


    return (


        products.map((product) => (
            <div className="product-card" key={product.id}>
                <div className="product-image">
                    <Image src={product.image} alt="product image" width={250} height={200} style={{ objectFit: "cover" }} />
                </div>
                <div className="product-details">
                    <h3>{product.name}</h3>
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
