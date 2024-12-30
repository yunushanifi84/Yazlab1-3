import React, { useState } from "react";
import apiClient from "@/middlewares/apiClient";

const ProductModal = ({ product, onClose, onUpdate, onDelete }) => {
    const [updatedStock, setUpdatedStock] = useState(product.stock);

    const handleUpdateStock = async () => {
        try {
            await apiClient.put(`/api/admin/products/${product._id}`, {
                stock: updatedStock,
            });
            onUpdate(product._id, updatedStock);
            onClose();
        } catch (error) {
            console.error("Stok güncellenirken hata oluştu:", error);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            await apiClient.delete(`/api/admin/products/${product._id}`);
            onDelete(product._id);
            onClose();
        } catch (error) {
            console.error("Ürün silinirken hata oluştu:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3">
                <div className="px-6 py-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-bold">Ürün Detayları</h2>
                    <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6">
                    <p><strong>Ürün Adı:</strong> {product.productName}</p>
                    <p><strong>Açıklama:</strong> {product.description}</p>
                    <p><strong>Stok:</strong> {product.stock}</p>
                    <p><strong>Fiyat:</strong> {product.price} TL</p>
                    <div className="mb-4">
                        <input
                            type="number"
                            value={updatedStock}
                            onChange={(e) => setUpdatedStock(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Yeni Stok Miktarı Girin"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={handleDeleteProduct}
                        >
                            Sil
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleUpdateStock}
                        >
                            Güncelle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
