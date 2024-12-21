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

        let temp
        products.map((product) => {
            const existingProduct = loadCart().find((item) => item.id === product.id);
            if (existingProduct) {

            }
            cart.push(product);
        })

        if (cart.length === 0) {
            return;
        }
        setCart(cart);
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
                                    <Image src={product.image} width={100} height={100} alt={product.name} />
                                </div>
                                <div className="cart-item-details">
                                    <h2 className="cart-item-title">{product.name}</h2>
                                    <p className="cart-item-price">{product.price} TL</p>
                                    <div className="cart-item-actions">
                                        <label style={{ marginRight: "auto", color: "black" }}>
                                            <Image
                                                src={minusIcon}
                                                width={15}
                                                height={15}
                                                alt={product.title}
                                                onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                                            />
                                            <input
                                                type="number"
                                                min="1"
                                                value={product.quantity || 1}
                                                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                            />
                                            <Image
                                                src={plusIcon}
                                                width={15}
                                                height={15}
                                                alt={product.title}
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
            )}
        </div>
    );
}
