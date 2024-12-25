"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Logs = () => {
    const [logs, setLogs] = useState([]);


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("/api/admin/logs");
                setLogs(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);




    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Günlük Kayıtları</h1>

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
                        {logs.map((log, index) => {
                            // Log türüne göre sınıf belirle
                            let logClass = "";
                            switch (log.LogType) {
                                case "Error":
                                    logClass = "bg-red-100 dark:bg-red-800 text-red-700";
                                    break;
                                case "Warning":
                                    logClass = "bg-yellow-100 dark:bg-yellow-800 text-yellow-700";
                                    break;
                                case "Info":
                                    logClass = "bg-green-100 dark:bg-green-800 text-green-700";
                                    break;
                                default:
                                    logClass = "";
                            }

                            return (
                                <tr
                                    key={log._id}
                                    className={`${logClass} hover:bg-gray-200 dark:hover:bg-gray-700`}
                                >
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{log._id}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{log.LogType}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{log.LogDetails}</td>
                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{new Date(log.LogDate).toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Logs;
