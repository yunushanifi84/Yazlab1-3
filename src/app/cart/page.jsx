"use client"
import React, { useState, useEffect } from 'react';
import './page.css';
import minusIcon from '@/images/Icons/minus.png';
import plusIcon from '@/images/Icons/plus.png';
import Image from 'next/image';
import axios from 'axios';
import bufferToBase64 from '@/utils/imageConverter';
import { get } from 'mongoose';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [storedCart, setStoredCart] = useState([]);
    const loadCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

        return storedCart;
    };

    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemove = (productId) => {
        const updatedCart = storedCart.filter((item) => item.ProductID !== productId);
        setStoredCart(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleQuantityChange = (productId, minusOrPlus) => {

        const updatedCart = loadCart().map((item) =>
            item.ProductID === productId ? { ...item, Quantity: item.Quantity + minusOrPlus } : item
        );
        setStoredCart(updatedCart);
        updateLocalStorage(updatedCart);
    };

    useEffect(() => {

        const localCart = loadCart();
        if (localCart.length !== 0) {
            const products = async () => {
                const response = await axios.post('/api/products/getProductsByList', { ids: localCart.map((item) => item.ProductID) });
                return response.data;
            }

            products().then((products) => {
                const updatedCart = localCart.map((item) => {
                    const product = products.find((product) => product._id === item.ProductID);
                    return { ...product, Quantity: item.Quantity };
                });
                setCart(updatedCart);
            });
        }
        else {
            setCart([]);
        }

    }, [storedCart]);

    const handleClickPurchase = (e) => {
        e.preventDefault();
        const localCart = loadCart();
        const response = axios.post('/api/orders',
            {
                CustomerID: localStorage.getItem('CustomerID'), Products: localCart, TotalPrice: 0, CustomerType: localStorage.getItem('CustomerType')
            }
        );


    }



    return (
        <div className="maincontainer">
            <div className="cart-container">
                <h1 className="cart-title">Sepetiniz</h1>
                {cart.length === 0 ? (
                    <p className="empty-cart">Sepetiniz boş.</p>
                ) : (
                    <div className="cart-items">
                        {cart.map((product) => {

                            return (
                                <div className="cart-item" key={product._id}>
                                    <div className="cart-item-image">
                                        <Image src={bufferToBase64(product.imageStream)} width={100} height={100} alt={`Image of ${product.productName}`} />
                                    </div>
                                    <div className="cart-item-details">
                                        <h2 className="cart-item-title">{product.productName}</h2>
                                        <p className="cart-item-price">{product.price} TL</p>
                                        <div className="cart-item-actions">
                                            <label style={{ marginRight: "auto", color: "black", display: "flex", alignItems: "center" }}>
                                                <Image
                                                    src={minusIcon}
                                                    width={15}
                                                    height={15}
                                                    alt="Decrease quantity"
                                                    onClick={() => handleQuantityChange(product._id, -1)}
                                                />
                                                <span className='product-quantity'>{loadCart().find((item) => item.ProductID === product._id)?.Quantity}</span>
                                                <Image
                                                    src={plusIcon}
                                                    width={15}
                                                    height={15}
                                                    alt="Increase quantity"
                                                    onClick={() => handleQuantityChange(product._id, +1)}
                                                />
                                            </label>

                                            <button onClick={() => handleRemove(product._id)}>Kaldır</button>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
                }
            </div >
            <div className='cart-purchase'>
                <h2>Ödeme Bilgileri</h2>
                <form className="payment-form">
                    <label>
                        Kart Numarası:
                        <input type="text" placeholder="**** **** **** ****" defaultValue={"123456789000"} />
                    </label>
                    <label>
                        Son Kullanma Tarihi:
                        <input type="text" placeholder="AA/YY" defaultValue={"01/01"} />
                    </label>
                    <label>
                        CVV:
                        <input type="text" placeholder="***" defaultValue={"123"} />
                    </label>
                    <button className="purchase-button" onClick={handleClickPurchase}>Satın Al</button>
                </form>
            </div>

        </div>
    );
}
