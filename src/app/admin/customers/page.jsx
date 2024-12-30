"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/middlewares/apiClient";

const CustomersTable = () => {
    const [customers, setCustomers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        CustomerName: "",
        Budget: "",
        CustomerType: "",
        Email: "",
        Password: ""
    });

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await apiClient.get("/api/admin/customers");
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/api/admin/customers", newCustomer);
            setCustomers([...customers, response.data]);
            setIsModalOpen(false);
            setNewCustomer({ name: "", email: "", phone: "" });
            window.location.reload();
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Müşteriler</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Müşteri Ekle
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/3">
                        <div className="px-6 py-4 flex justify-between items-center border-b">
                            <h2 className="text-lg font-bold">Yeni Müşteri Ekle</h2>
                            <button
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleAddCustomer} className="p-6">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="CustomerName"
                                    value={newCustomer.CustomerName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Müşteri adı girin"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="Email"
                                    value={newCustomer.Email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Email adresi girin"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="Password"
                                    value={newCustomer.Password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Şifre girin"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    name="Budget"
                                    value={newCustomer.Budget}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Bütçe girin"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <select
                                    name="CustomerType"
                                    value={newCustomer.CustomerType}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                >
                                    <option value="">Müşteri Tipi Seçin</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Standard">Standard</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Kaydet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">ID</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Ad</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Email</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Şifre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr
                                key={customer._id}
                                className={`${index % 2 === 0
                                    ? "bg-gray-100 dark:bg-gray-800"
                                    : "bg-white dark:bg-gray-900"
                                    } hover:bg-gray-200 dark:hover:bg-gray-700`}
                            >
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{customer._id}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{customer.CustomerName}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{customer.Email}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{customer.Password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CustomersTable;
