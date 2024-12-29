"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (token && email) {
            setIsAuthenticated(true);

            if (email === process.env.ADMIN_EMAIL) {
                setIsAdmin(true);
            }
        }
    }, []);

    const handleLogin = () => {
        location.href = "/login";
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsAuthenticated(false);
        setIsAdmin(false);
        location.href = "/";
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            location.href = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
        }
    };
    useEffect(() => {
        if (localStorage.getItem('CustomerID') !== null) {
            axios.get(`/api/customers/${localStorage.getItem('CustomerID')}`).then((response) => {
                console.log("customer ", response.data);
                setCustomer(response.data);
            });
        }
    }, []);

    return (
        <nav className="bg-blue-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-white font-bold text-2xl">
                                Shopy
                            </Link>
                        </div>
                        {!isAdmin && (
                            <div className="ml-4 flex">
                                <form onSubmit={handleSearchSubmit} className="flex">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Ürün ara..."
                                        className="px-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ml-3 border-none shadow-sm"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Ara"
                                        className="px-3 py-2 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ml-1"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {isAdmin && (
                                <div className="flex space-x-4">
                                    <Link
                                        href="/admin/products"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Ürünler
                                    </Link>
                                    <Link
                                        href="/admin/customers"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Müşteriler
                                    </Link>
                                    <Link
                                        href="/admin/logs"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Günlük Kayıtları
                                    </Link>
                                    <Link
                                        href="/admin/orders"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Siparişler
                                    </Link>
                                </div>
                            )}
                            {!isAdmin && (
                                <div className="flex space-x-4">
                                    <Link
                                        href="/"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Anasayfa
                                    </Link>
                                    <Link
                                        href="/cart"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Sepete Git
                                    </Link>
                                    <div className="text-white flex flex-row items-start space-x-4">
                                        <span>Kullanıcı Adı: {customer.CustomerName}</span>
                                        <span>Bütçe: {customer.Budget}</span>
                                        <span>Toplam Harcama: {customer.TotalSpent}</span>
                                        <span>Müşteri Tipi: {customer.CustomerType}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                            >
                                Çıkış Yap
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                            >
                                Giriş Yap
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
