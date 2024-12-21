"use client";
import React, { useEffect, useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            location.href = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    return (
        <nav className="bg-blue-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a href="/" className="text-white font-bold text-xl">
                                Shopy
                            </a>
                        </div>
                        {!isAdmin && <div className="ml-4 flex">
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
                        </div>}
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">

                            {isAdmin && (
                                <div>
                                    <a
                                        href="/admin"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Müşteriler
                                    </a>
                                    <a
                                        href="/admin"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Loglar
                                    </a>

                                </div>
                            )}
                            {!isAdmin && (
                                <div>
                                    <a
                                        href="/"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Anasayfa
                                    </a>
                                    <a
                                        href="/cart"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                    >
                                        Sepete Git
                                    </a>
                                </div>

                            )}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                                >
                                    Çıkış Yap
                                </button>
                            </>
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
