import React, { useState, useEffect } from 'react';
import './Body.css';
import ProductGrid from './ProductGrid';
import './ProductGrid.css'; // Ensure the CSS is included

// Importing images
import Adidas_Adizero from './Products/Adidas_Adizero.jpg';
import Ahla_shoes from './Products/Ahla_shoes.jpg';
import Altama_Outdoor from './Products/Altama_Outdoor.jpeg';
import Asics_Nimbus from './Products/Asics_Nimbus.jpg';
import Caterpillar_Outdoor from './Products/Caterpillar_Outdoor.jpeg';
import Lowa_outdoor from './Products/Lowa_outdoor.jpg';
import UnderArmout from './Products/UnderArmout.jpeg';

const Body = ({ imgSrc, addToCart }) => {
    const [shoes, setShoes] = useState([]);
    const [notification, setNotification] = useState('');
    const [id, getProductId] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const res = await response.json();
                console.log(res);
                setShoes(res);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const res = await response.json();
                console.log(res);
                setShoes(res);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        console.log('Product added to cart:', product);
        addToCart(product);
        setNotification(`Added ${product.productName} to the cart!`);
        setTimeout(() => setNotification(''), 3000);
    };

    return (
        <>
            <div className="body-container">
                <img src={imgSrc} alt="Content" className="body-image" />
            </div>
            <div className="title">
                <h1 style={{ textAlign: 'center' }}>Every Step Counts</h1>
                <h3 style={{ textAlign: 'left' }}>
                    Lech Lecha is your destination for top-quality sports and outdoor footwear. We offer a diverse range of shoes designed for comfort, durability, and style, perfect for athletes and adventurers. Step into our store and find the ideal pair for your next adventure.
                </h3>
            </div>
            <div className="body-content">
                {/* Pass the shoes data to the ProductGrid */}
                <ProductGrid products={shoes} onAddToCart={handleAddToCart} />
            </div>
            {notification && <div className="notification">{notification}</div>}
        </>
    );
};

export default Body;
