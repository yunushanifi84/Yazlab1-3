"use client"
import React, { useState, useEffect } from 'react';
import './page.css';
import minusIcon from '@/images/Icons/minus.png';
import plusIcon from '@/images/Icons/plus.png';
import Image from 'next/image';
import apiClient from '@/middlewares/apiClient';
import bufferToBase64 from '@/utils/imageConverter';
import { ToastContainer, toast } from 'react-toastify';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [storedCart, setStoredCart] = useState([]);
    const [customer, setCustomer] = useState({});
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
    const calculateTotalPrice = () => {
        return cart.reduce((acc, item) => acc + item.price * item.Quantity, 0);
    };

    useEffect(() => {

        const localCart = loadCart();
        if (localCart.length !== 0) {
            const products = async () => {
                const response = await apiClient.post('/api/products/getProductsByList', { ids: localCart.map((item) => item.ProductID) });
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

    useEffect(() => {
        if (localStorage.getItem('CustomerID') === null || localStorage.getItem('CustomerID') === "undefined") {
            return;
        }
        apiClient.get(`/api/customers/${localStorage.getItem('CustomerID')}`).then((response) => {
            setCustomer(response.data);
        });

    }, []);

    const handleClickPurchase = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Ödeme işlemi gerçekleştiriliyor...', { autoClose: false });
        if (localStorage.getItem('CustomerID') === null || localStorage.getItem('CustomerID') === "undefined") {
            toast.update(toastId, { type: 'info', render: 'Lütfen önce giriş yapınız.', autoClose: 500, isLoading: false });
            setTimeout(() => {

                window.location.href = '/login';

            }, 1500);
            return;
        }

        const localCart = loadCart();
        if (customer.Budget - calculateTotalPrice() < 0) {
            toast.update(toastId, { type: 'error', render: 'Bakiyeniz yetersiz.', autoClose: 1000, isLoading: false });
            return;
        }


        await apiClient.post('/api/orders',
            {
                CustomerID: localStorage.getItem('CustomerID'), Products: localCart, TotalPrice: calculateTotalPrice(), CustomerType: localStorage.getItem('CustomerType')
            }
        ).then((response) => {
            if (response.status === 200) {
                toast.update(toastId, { type: 'success', render: 'Ödeme işlemi başarılı.', autoClose: 1000, isLoading: false });
                setTimeout(() => {
                    localStorage.removeItem('cart');
                    window.location.href = '/';
                }, 1000);
            }
        }).catch((error) => {
            toast.update(toastId, { type: 'error', render: 'Ödeme işlemi sırasında bir hata oluştu.', autoClose: 1000, isLoading: false });
        });


    }



    return (
        <div className="maincontainer">
            <ToastContainer />
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
