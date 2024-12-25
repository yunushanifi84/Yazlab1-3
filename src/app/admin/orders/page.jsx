"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
    const [orders, setOrders] = useState([]);
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

    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setOrders((prevOrders) =>
                prevOrders.map((order) => {
                    const waitingTime = Math.floor((now - new Date(order.OrderDate)) / 1000);
                    const priorityScore =
                        (order.CustomerID.CustomerType === "Premium" ? 15 : 10) + (waitingTime * waitingTime * 0.5);
                    return { ...order, priorityScore };
                })
            );
            orders.sort((a, b) => b.priorityScore - a.priorityScore);

        }, 1000);
        return () => clearInterval(interval); // Bellek sızıntısını önlemek için interval temizleme
    }, []);



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Siparişler</h1>

            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">ID</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Tür</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Detaylar</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Tarih</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Öncelik</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            // order türüne göre sınıf belirle
                            let orderClass = "";
                            return (
                                <tr
                                    key={order._id}
                                    className={`${orderClass} hover:bg-gray-200 dark:hover:bg-gray-700`}
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
