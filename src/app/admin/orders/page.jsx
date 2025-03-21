"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/middlewares/apiClient";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import('react-lottie'), { ssr: false })


const Order = () => {
    const [orders, setOrders] = useState([]);
    const [checkNewOrder, setCheckNewOrder] = useState(true);
    const [logs, setLogs] = useState([]);
    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const response = await apiClient.get("/api/admin/orders");
                setOrders(response.data);

            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchOrders();

    }, [checkNewOrder]);

    const CartLottie = () => {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: require('@/lotties/cart-animation.json'),
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }

        };

        return (
            <div>
                <Lottie
                    options={defaultOptions}
                    height={100}
                    width={100}
                />
            </div>
        )
    }


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setOrders((prevOrders) =>
                prevOrders.map((order) => {
                    if (order.OrderStatus === "Sipariş Onaylandı" || order.OrderStatus === "Sipariş İptal Edildi") return order;
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
                    order.OrderStatus !== "Sipariş Onaylandı" && order.OrderStatus !== "Sipariş İptal Edildi"
                        ? { ...order, OrderStatus: "Sipariş İşleniyor" }
                        : order
                )
            );

            for (let i = 0; i < orders.length; i++) {
                // En güncel `orders` durumunu alın
                const latestOrders = [...orders];
                const currentOrder = latestOrders[i];


                // Eğer sipariş zaten "Sipariş Onaylandı" veya "Sipariş İptal Edildi" ise atla
                if (currentOrder.OrderStatus === "Sipariş Onaylandı" || currentOrder.OrderStatus === "Sipariş İptal Edildi") {
                    continue;
                }

                // 5 saniye bekle

                try {
                    // Sipariş durumunu "Sipariş Onaylandı" olarak güncelle
                    await apiClient.put(`/api/admin/orders/updateOrder`, { orderId: currentOrder._id, OrderStatus: "Sipariş Onaylandı" });

                    // State güncellemesi
                    setOrders((prevOrders) =>
                        prevOrders.map((ordr) =>
                            ordr._id === currentOrder._id && ordr.OrderStatus === "Sipariş İşleniyor"
                                ? { ...ordr, OrderStatus: "Sipariş Onaylandı", priorityScore: Number.MAX_SAFE_INTEGER, OrderLog: "Sipariş Tamamlandı" }
                                : ordr
                        )
                    );
                } catch (error) {

                    // Hata durumunda sipariş "Sipariş İptal Edildi" olarak işaretlenir
                    setOrders((prevOrders) =>
                        prevOrders.map((ordr) =>
                            ordr._id === currentOrder._id && ordr.OrderStatus === "Sipariş İşleniyor"
                                ? { ...ordr, OrderStatus: "Sipariş İptal Edildi", priorityScore: Number.MAX_SAFE_INTEGER, OrderLog: error.response.data.error }
                                : ordr
                        )
                    );
                }
            }
        } catch (error) {
            console.error("Error submitting orders:", error);
        }

        // Yeni siparişleri kontrol et
        const checkNewOrders = async () => {
            setCheckNewOrder((prev) => !prev);
        };
        await checkNewOrders();
    };

    useEffect(() => {

        const fetchLogs = async () => {
            try {
                const response = await apiClient.get('/api/admin/logs/semaphoreLogs');
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();

        const interval = setInterval(fetchLogs, 1000); // Logları her saniye yenile
        return () => clearInterval(interval);
    }, []);


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
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Sipariş Durumu</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Sipariş Logu</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Sipariş Detayları</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Sipariş Tarihi</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Öncelik Skoru</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Semaphore Logları</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            let orderClass = "";
                            if (order.OrderStatus === "Sipariş Onaylandı") {
                                orderClass = "bg-green-200 dark:bg-green-800 hover:bg-green-300";
                            } else if (order.OrderStatus === "Sipariş İşleniyor") {
                                orderClass = "bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300";
                            }
                            else if (order.OrderStatus === "Sipariş İptal Edildi") {
                                orderClass = "bg-red-200 dark:bg-red-800 hover:bg-red-300 hover:text-white";
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
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        {!order.OrderLog && logs.some((log) => log.orderId._id === order._id) ? (
                                            CartLottie()
                                        ) : (
                                            order.OrderLog
                                        )}
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{order.Products.map(item => `(${item.ProductID} x ${item.Quantity})`).join(', ')}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{new Date(order.OrderDate).toLocaleString()}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        {order.OrderStatus !== "Sipariş Onaylandı" && order.OrderStatus !== "Sipariş İptal Edildi" && order.priorityScore !== undefined ? order.priorityScore.toFixed(0) : ""}
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        {logs.length > 0 && logs
                                            .filter((log) => log.orderId._id === order._id)
                                            .map((log, index) => (
                                                <div key={index}>{`${log.status}: ${log.message}`}</div>
                                            ))}
                                    </td>

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
