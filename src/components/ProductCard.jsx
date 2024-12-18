import React from 'react'
import Image from "next/image";
import "@/styles/ProductCard.css";
export default function ProductCard({ products }) {



    return (


        products.map((product) => (
            <div className="product-card" key={product.id}>
                <div className="product-image">
                    <Image src={product.image} alt="product image" width={250} height={200} objectFit="cover" />
                </div>
                <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            </div>
        ))

    )
}
