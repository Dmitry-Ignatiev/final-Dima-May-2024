import React from 'react';
import './Product.css';
import { useState } from 'react';
const Product = ({ image, title, count, addToCart }) => {
    //if (price === undefined || price === null) {
    //    return <div>Price not available</div>; // Handle the case where price is undefined
    //}
    const [price, setPrice] = useState(0);

    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <h3 className="product-name">{title}</h3>
            {/*<p className="product-price">${price.toFixed(2)}</p>*/}
            <p className="product-count">Count: {count}</p> {/* Display count */}
            <button className="addButton" onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default Product;
