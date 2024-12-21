import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";
import db from "@/lib/mongodb";
import Log from "@/models/LogModel";

export async function POST(request) {
    try {
        // FormData'yı al
        const formData = await request.formData();

        // Form verilerini al
        const productName = formData.get("productName");
        const description = formData.get("description");
        const stock = formData.get("stock");
        const price = formData.get("price");
        const file = formData.get("image"); // Resim dosyası

        // Alanların kontrolü
        if (!productName || !description || !stock || !price || !file) {
            return NextResponse.json(
                { error: "Tüm alanlar doldurulmalıdır ve resim yüklenmelidir." },
                { status: 400 }
            );
        }

        // Resim verisini byte stream olarak oku
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Yeni ürün oluştur
        const product = new Product({
            productName,
            description,
            stock: parseInt(stock, 10),
            price: parseFloat(price),
            imageStream: buffer, // Resmi byte stream olarak kaydet
        });

        // Veritabanına kaydet
        await product.save();

        await Log.create({
            LogDetails: `Yeni ürün eklendi: ${productName}`,
            LogType: "Info",
        });
        return NextResponse.json(
            { message: "Ürün başarıyla eklendi.", id: product._id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Ürün ekleme sırasında hata:", error);
        await Log.create({
            LogDetails: `Ürün ekleme başarısız oldu: ${error.message}`,
            LogType: "Error",
        });
        return NextResponse.json(
            { error: "Ürün ekleme başarısız oldu." },
            { status: 500 }
        );
    }
}
