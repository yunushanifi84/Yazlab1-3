import React from 'react'
import './page.css'
export default function
    () {
    return (
        <div className='cart-section'>

            <h2>Sepet</h2>
            <div className='product-list'>

                <div className='product'>
                    <img src='https://via.placeholder.com/150' alt='product' />
                    <div className='product-info'>
                        <h3>Product 1</h3>
                        <p>Description for product 1</p>
                        <p>$10.00</p>
                    </div>

                </div>

                <div className='product'>
                    <img src='https://via.placeholder.com/150' alt='product' />
                    <div className='product-info'>
                        <h3>Product 2</h3>
                        <p>Description for product 2</p>
                        <p>$20.00</p>
                    </div>
                </div>



            </div>

        </div>
    )
}
