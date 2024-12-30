"use client"
import React, { useState, useEffect } from 'react'
import apiClient from '@/middlewares/apiClient';

export default function page() {
    const [priorityScore, setPriorityScore] = useState(0);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            apiClient.get("/api/admin/orders").then((response) => {

                const filteredOrders = response.data.filter(order => order.CustomerID._id === localStorage.getItem("CustomerID"));
                setOrders(filteredOrders);
                console.log("response", filteredOrders);



            });
        }, 2500);
        return () => clearInterval(interval); // Bellek sızıntısını önlemek için interval temizleme

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {

            const now = new Date();
            setOrders(prevOrders => prevOrders.map((order) => {
                if (order.OrderStatus === "Sipariş Onaylandı" || order.OrderStatus === "Sipariş İptal Edildi") return order;
                const waitingTime = Math.floor((now - new Date(order.OrderDate)) / 1000);
                console.log("prevOrders", prevOrders);
                const priorityScore =
                    (order.CustomerID.CustomerType === "Premium" ? 15 : 10) + (waitingTime * waitingTime * 0.5);
                return { ...order, priorityScore };
            }))

        }, 100);


        return () => clearInterval(interval); // Bellek sızıntısını önlemek için interval temizleme
    }, [orders]);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>Siparişlerim</h1>
            {orders.length > 0 ? (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                                Sipariş No
                            </th>

                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                                Fiyat
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                                Tarih
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                                Öncelik Skoru
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                                Durum
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                    {order._id}
                                </td>

                                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                    {order.TotalPrice}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                    {order.OrderDate}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                    {order.priorityScore}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                    {order.OrderStatus}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    Henüz bir siparişiniz bulunmamaktadır.
                </p>
            )}
        </div>
    );
}
