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
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{order.orderType}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{order.orderDetails}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{new Date(order.LogDate).toLocaleString()}</td>
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
