"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductModal from "./ProductModal";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: "",
        description: "",
        stock: "",
        price: "",
    });
    const [imageStream, setImageStream] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Ürünleri çekerken hata oluştu:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageStream(e.target.files[0]);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productName", newProduct.productName);
        formData.append("description", newProduct.description);
        formData.append("stock", newProduct.stock);
        formData.append("price", newProduct.price);
        if (imageStream) {
            formData.append("image", imageStream);
        }

        try {
            const response = await axios.post("/api/admin/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setProducts([...products, response.data]);
            setIsModalOpen(false);
            setNewProduct({
                productName: "",
                description: "",
                stock: "",
                price: "",
            });
            setImageStream(null);
            window.location.reload();
        } catch (error) {
            console.error("Ürün eklerken hata oluştu:", error);
        }
    };

    const handleUpdateProduct = (productId, updatedStock) => {
        setProducts(products.map(product => 
            product._id === productId ? { ...product, stock: updatedStock } : product
        ));
    };

    const handleDeleteProduct = (productId) => {
        setProducts(products.filter(product => product._id !== productId));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Ürünler</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Ürün Ekle
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/3">
                        <div className="px-6 py-4 flex justify-between items-center border-b">
                            <h2 className="text-lg font-bold">Yeni Ürün Ekle</h2>
                            <button
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct} className="p-6">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="productName"
                                    value={newProduct.productName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Ürün Adı Girin"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Açıklama Girin"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    name="stock"
                                    value={newProduct.stock}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Stok Miktarı Girin"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Fiyat Girin"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
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

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onUpdate={handleUpdateProduct}
                    onDelete={handleDeleteProduct}
                />
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">ID</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Ürün Adı</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Açıklama</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Stok</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-bold">Fiyat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr
                                key={product._id}
                                className={`${
                                    index % 2 === 0
                                        ? "bg-gray-100 dark:bg-gray-800"
                                        : "bg-white dark:bg-gray-900"
                                } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer`}
                                onClick={() => setSelectedProduct(product)}
                            >
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{product._id}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{product.productName}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{product.description}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{product.stock}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{product.price} TL</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
