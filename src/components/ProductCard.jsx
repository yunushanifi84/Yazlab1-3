import React from 'react'
import Image from "next/image";
import "@/styles/ProductCard.css";
import { useState } from 'react';
export default function ProductCard({ products }) {
    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log(cart);
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            cart.push({ id: product.id, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
        }


        console.log(localStorage.getItem('cart'));
    }


    return (


        products.map((product) => (
            <div className="product-card" key={product.id}>
                <div className="product-image">
                    <Image src={product.image} alt="product image" width={250} height={200} objectFit="cover" />
                </div>
                <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className='price'>{product.price}</p>

                </div>
                {JSON.parse(localStorage.getItem('cart')).quantity &&
                    <label style={{ marginRight: "auto", color: "black", display: "flex", alignItems: "center" }}>
                        <Image
                            src={minusIcon}
                            width={15}
                            height={15}
                            alt={product.title}
                            onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                        />
                        <span className='product-quantity'>{product.quantity}</span>
                        <Image
                            src={plusIcon}
                            width={15}
                            height={15}
                            alt={product.title}
                            onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                        />
                    </label>
                }
                {!JSON.parse(localStorage.getItem('cart')).quantity &&
                    <button className="add-button" onClick={() => handleAddToCart(product)}>
                        Sepete Ekle
                    </button>}
            </div>
        ))

    )
}
