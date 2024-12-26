"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { set } from "mongoose";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [checkNewOrder, setCheckNewOrder] = useState(true);
    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const response = await axios.get("/api/admin/orders");
                setOrders(response.data);

            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchOrders();

    }, [checkNewOrder]);


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setOrders((prevOrders) =>
                prevOrders.map((order) => {
                    if (order.OrderStatus === "Sipariş Onaylandı") return order;
                    const waitingTime = Math.floor((now - new Date(order.OrderDate)) / 1000);
                    const priorityScore =
                        (order.CustomerID.CustomerType === "Premium" ? 15 : 10) + (waitingTime * waitingTime * 0.5);
                    return { ...order, priorityScore };
                })
            );
            orders.sort((a, b) => b.priorityScore - a.priorityScore);

        }, 1000);
        return () => clearInterval(interval); // Bellek sızıntısını önlemek için interval temizleme
    }, [orders]);

    const handleSubmitOrders = async () => {

        try {
            // Öncelikle tüm siparişleri "Sipariş İşleniyor" durumuna geçir
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.OrderStatus !== "Sipariş Onaylandı"
                        ? { ...order, OrderStatus: "Sipariş İşleniyor" }
                        : order
                )
            );

            // Sırayla her siparişi "Sipariş Onaylandı" durumuna geçir
            for (const order of orders) {
                // 3 saniye bekle
                if (order.OrderStatus === "Sipariş Onaylandı") continue;

                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Sipariş durumunu güncelle
                try {
                    // State güncellemesi
                    setOrders((prevOrders) =>
                        prevOrders.map((ordr) =>
                            ordr._id === order._id && ordr.OrderStatus === "Sipariş İşleniyor" ? { ...ordr, OrderStatus: "Sipariş Onaylandı" } : ordr
                        )
                    );
                    await axios.put(`/api/admin/orders/updateOrder`, { orderId: order._id, OrderStatus: "Sipariş Onaylandı" });
                } catch (error) {
                    console.error(`Error updating order ${order._id}:`, error);
                }
            }
        } catch (error) {
            console.error("Error submitting orders:", error);
        }

        const checkNewOrders = async () => {
            await new Promise(() => setCheckNewOrder(!checkNewOrder));
        };
        await checkNewOrders();
    };



    return (
        <div className="container mx-auto px-4 py-8">

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Siparişler</h1>

            </div>

            <div className="submit-button flex justify-center items-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 "
                    onClick={handleSubmitOrders}
                >Siparişleri Onayla</button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Sipariş ID</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Tür</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Detaylar</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Tarih</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Öncelik Skoru</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            let orderClass = "";
                            if (order.OrderStatus === "Sipariş Onaylandı") {
                                orderClass = "bg-green-200 dark:bg-green-800 hover:bg-green-300";
                            } else if (order.OrderStatus === "Sipariş İşleniyor") {
                                orderClass = "bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300";
                            } else {
                                orderClass = "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300";
                            }

                            return (
                                <tr
                                    key={order._id}
                                    className={`${orderClass} `}
                                >
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{order._id}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{order.OrderStatus}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{order.orderDetails}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{new Date(order.OrderDate).toLocaleString()}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{order.priorityScore ? order.priorityScore.toFixed(0) : ""}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Order;
