"use client"
import React, { useState, useEffect } from 'react';
import './page.css';
import minusIcon from '@/images/Icons/minus.png';
import plusIcon from '@/images/Icons/plus.png';
import Image from 'next/image';
import { products } from '@/utils/products';

export default function CartPage() {
    const [cart, setCart] = useState([]);

    const loadCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        return storedCart;
    };

    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemove = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
    };

    useEffect(() => {

        const storedCart = loadCart();
        const updatedCart = storedCart.map((item) => {
            const product = products.find((product) => product.id === item.id);
            return { ...product, quantity: item.quantity };
        });
        setCart(updatedCart);
    }, []);

    return (
        <div className="cart-container">
            <h1 className="cart-title">Sepetiniz</h1>
            {cart.length === 0 ? (
                <p className="empty-cart">Sepetiniz boş.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((product) => {

                        return (
                            <div className="cart-item" key={product.id}>
                                <div className="cart-item-image">
                                    <Image src={product.image} width={100} height={100} alt={`Image of ${product.name}`} />
                                </div>
                                <div className="cart-item-details">
                                    <h2 className="cart-item-title">{product.name}</h2>
                                    <p className="cart-item-price">{product.price} TL</p>
                                    <div className="cart-item-actions">
                                        <label style={{ marginRight: "auto", color: "black", display: "flex", alignItems: "center" }}>
                                            <Image
                                                src={minusIcon}
                                                width={15}
                                                height={15}
                                                alt="Decrease quantity"
                                                onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                                            />
                                            <span className='product-quantity'>{product.quantity}</span>
                                            <Image
                                                src={plusIcon}
                                                width={15}
                                                height={15}
                                                alt="Increase quantity"
                                                onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                            />
                                        </label>

                                        <button onClick={() => handleRemove(product.id)}>Kaldır</button>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )
            }
        </div >
    );
}
