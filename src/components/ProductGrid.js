import React, { useState } from 'react';
import Product from './Product';
import './ProductGrid.css';

// ProductGrid component
const ProductGrid = ({ products = [], onAddToCart, removeFromCart }) => {
    // Limit the number of products to 9
    const limitedProducts = products.slice(0, 9);

    // Initialize product counts using the product's unique identifier (_id or id)
    const [productCounts, setProductCounts] = useState(
        products.reduce((acc, product) => {
            const productId = product._id || product.id; // Handle both cases
            acc[productId] = 0;
            return acc;
        }, {})
    );

    // Handle adding products to cart
    const handleAddToCart = (product) => {
        const productId = product._id || product.id;  // Use the correct field for ID

        onAddToCart(product);  // Call the parent-provided addToCart function

        // Update the product count based on the product ID
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: (prevCounts[productId] || 0) + 1
        }));
    };

    // Handle removing products from cart
    const handleRemoveFromCart = (product) => {
        const productId = product._id || product.id;  // Use the correct field for ID

        removeFromCart(product);  // Call the parent-provided removeFromCart function

        // Decrease the product count, ensuring it doesn't go below 0
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: Math.max((prevCounts[productId] || 0) - 1, 0)
        }));
    };

    return (
        <div className="product-grid">
            {limitedProducts.map((product) => {
                const productId = product._id || product.id;  // Use the correct field for ID
                return (
                    <Product
                        key={productId}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        count={productCounts[productId] || 0}
                        addToCart={() => handleAddToCart(product)} // Use the local handler function
                        removeFromCart={() => handleRemoveFromCart(product)} // Allow removing from cart
                    />
                );
            })}
        </div>
    );
};

export default ProductGrid;
