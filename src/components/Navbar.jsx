"use client";
import React, { useState } from 'react';
// Eğer Next.js değilse, window.location kullanabilirsiniz.

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Kullanıcı giriş durumu
    const [searchQuery, setSearchQuery] = useState(''); // Arama terimi durumu


    // Örnek olarak giriş yapma ve çıkış yapma işlevleri
    const handleLogin = () => {
        location.href = '/login';
        //setIsAuthenticated(true);
    };

    const handleLogout = () => {
        //setIsAuthenticated(false);
    };

    // Arama formunun gönderilme işlemi
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Arama terimini işleyin, örneğin bir arama sayfasına yönlendirin
            // Next.js kullanıyorsanız:

            location.href = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
            // Eğer Next.js değilse, aşağıdaki satırı kullanabilirsiniz:
            // window.location.href = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
            // Arama terimini temizlemek isterseniz:
            // setSearchQuery('');
        }
    };

    return (
        <nav className="bg-blue-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Sol Kısım: Logo/Marka Adı ve Arama Çubuğu */}
                    <div className="flex items-center">
                        {/* Logo veya Marka Adı */}
                        <div className="flex-shrink-0">
                            <a href="/" className="text-white font-bold text-xl">
                                Shopy
                            </a>
                        </div>
                        {/* Arama Çubuğu */}
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
                                    {/* Arama İkonu */}
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
                    </div>
                    {/* Menü Linkleri (Desktop) */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a
                                href="#"
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                            >
                                Anasayfa
                            </a>
                            <a
                                href="#"
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                            >
                                Hakkımızda
                            </a>
                        </div>
                    </div>
                    {/* Hesap Menüsü veya Giriş Yap Butonu */}
                    <div className="hidden md:flex items-center">
                        {isAuthenticated ? (
                            <div className="ml-4 relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 focus:ring-white"
                                    id="user-menu-button"
                                    aria-expanded={isOpen}
                                    aria-haspopup="true"
                                >
                                    <span className="sr-only">Hesap Ayarları</span>
                                    {/* Kullanıcı İkonu */}
                                    <svg
                                        className="h-8 w-8 text-white"
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
                                            d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.793.595 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </button>
                                {/* Hesap Dropdown Menüsü */}
                                {isOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                    >
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            Profil
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            Ayarlar
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            Çıkış Yap
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
                            >
                                Giriş Yap
                            </button>
                        )}
                    </div>
                    {/* Mobil Menü Düğmesi */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Menüyü Aç</span>
                            {/* Menü Kapalıyken Hamburger İkonu */}
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
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
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                // Menü Açıkken X İkonu
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobil Menü */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="#"
                            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition duration-200"
                        >
                            Anasayfa
                        </a>
                        <a
                            href="#"
                            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition duration-200"
                        >
                            Hakkımızda
                        </a>
                        <form onSubmit={handleSearchSubmit} className="flex px-3 py-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ürün ara..."
                                className="flex-grow px-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            />
                            <button
                                type="submit"
                                aria-label="Ara"
                                className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
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
                        {isAuthenticated ? (
                            <>
                                <a
                                    href="#"
                                    className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition duration-200"
                                >
                                    Profil
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition duration-200"
                                >
                                    Çıkış Yap
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="w-full text-left text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition duration-200"
                            >
                                Giriş Yap
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
