
//import React, { useEffect, useState } from 'react';
//import './Cart.css'; // Ensure you include any required CSS

//const Cart = ({ cartItems, setCartItems, onSubmitOrder }) => {
//    const savedCart = localStorage.getItem('cartItems');
//    const initialCartItems = savedCart ? JSON.parse(savedCart) : [];
//    const [totalPrice, setTotalPrice] = useState(0);
//    const [formData, setFormData] = useState({
//        name: '',
//        email: '',
//        phone: '',
//        address: '',
//        shippingOption: 'free' // Default to free shipping
//    });

//    // Calculate total price when cartItems change
//    useEffect(() => {
//        localStorage.setItem('cartItems', JSON.stringify(cartItems)); const total = cartItems.reduce((acc, item) => {
//            const quantity = item.quantity || 1; // Default quantity to 1 if it's undefined
//            const price = parseFloat(item.price) || 0; // Ensure price is a number
//            return acc + (quantity * price);
//        }, 0);
//        setTotalPrice(total);
//    }, [cartItems]); // Recalculate total whenever cartItems change

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData({
//            ...formData,
//            [name]: value
//        });
//    };

//    const validateOrder = () => {
//        if (cartItems.length === 0) {
//            return 'The cart is empty.';
//        }
//        for (const item of cartItems) {
//            if (item.quantity < 1) {
//                return `Quantity for item ${item.name} must be at least 1.`;
//            }
//        }
//        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
//            return 'All fields are required.';
//        }
//        if (!/\S+@\S+\.\S+/.test(formData.email)) {
//            return 'Email format is invalid.';
//        }
//        return null;
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        const error = validateOrder();
//        if (error) {
//            alert(error);
//            return;
//        }
//        try {
//            const orderData = {
//                ...formData,
//                items: cartItems,
//                totalPrice: totalPrice
//            };
//            await onSubmitOrder(orderData); // Call the parent function to handle the order submission
//            setCartItems([]); // Optionally clear cart here or within onSubmitOrder
//            setTotalPrice(0);
//        } catch (error) {
//            console.error('Error during form submission:', error);
//        }
//    };

//    const handleIncrement = (id) => {
//        setCartItems((prevItems) =>
//            prevItems.map((item) =>
//                item.id === id
//                    ? { ...item, quantity: (item.quantity || 1) + 1 }
//                    : item
//            )
//        );
//    };

//    const handleDecrement = (id) => {
//        setCartItems((prevItems) =>
//            prevItems
//                .map((item) =>
//                    item.id === id
//                        ? {
//                            ...item,
//                            quantity: Math.max((item.quantity || 1) - 1, 0) // Allow quantity to go to 0
//                        }
//                        : item
//                )
//                .filter((item) => item.quantity > 0) // Filter out items with quantity 0
//        );
//    };

//    return (
//        <div className="order-completion">
//            <h2>Order Summary</h2>
//            <div className="order-items">
//                {cartItems.length === 0 ? (
//                    <p>Your cart is empty.</p>
//                ) : (
//                    <ul>
//                        {cartItems.map((item) => (
//                            <li key={item.id} className="order-item">
//                                <img src={item.image} alt={item.title} />
//                                <div className="order-item-details">
//                                    <p>{item._name}</p>
//                                    <p>Quantity: {item.quantity || 1}</p>
//                                    <p>Price per unit: ${parseFloat(item.price).toFixed(2)}</p>
//                                    {/*console.log('price per unit passed');*/}
//                                    <p>Total: ${((item.quantity || 1) * parseFloat(item.price)).toFixed(2)}</p>
//                                    {/*consol.log('total passed');*/}
//                                    <button onClick={() => handleDecrement(item.id)}>-</button>
//                                    <button onClick={() => handleIncrement(item.id)}>+</button>
//                                </div>
//                            </li>
//                        ))}
//                    </ul>
//                )}
//                <div className="order-total">
//                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
//                </div>
//            </div>
//            <h2>Order Form</h2>
//            <form onSubmit={handleSubmit} className="order-form">
//                <label>
//                    Name:
//                    <input
//                        type="text"
//                        name="name"
//                        value={formData.name}
//                        onChange={handleChange}
//                        required
//                    />
//                </label>
//                <label>
//                    Email:
//                    <input
//                        type="email"
//                        name="email"
//                        value={formData.email}
//                        onChange={handleChange}
//                        required
//                    />
//                </label>
//                <label>
//                    Phone:
//                    <input
//                        type="tel"
//                        name="phone"
//                        value={formData.phone}
//                        onChange={handleChange}
//                        required
//                    />
//                </label>
//                <label>
//                    Address:
//                    <input
//                        type="text"
//                        name="address"
//                        value={formData.address}
//                        onChange={handleChange}
//                        required
//                    />
//                </label>
//                <label>
//                    Shipping Option:
//                    <select
//                        name="shippingOption"
//                        value={formData.shippingOption}
//                        onChange={handleChange}
//                    >
//                        <option value="3-day">3-Day Shipping - $10</option>
//                        <option value="free">Free Shipping (14 Days)</option>
//                    </select>
//                </label>
//                <button type="submit" onClick={handleSubmit}>Place Order</button>
//            </form>
//        </div>
//    );
//};

//export default Cart;
import React, { useEffect, useState } from 'react';
import './Cart.css'; // Ensure you include any required CSS

const Cart = ({ cartItems, setCartItems, onSubmitOrder }) => {
    // Load saved cart items from localStorage during initial render
    const savedCart = localStorage.getItem('cartItems');
    const initialCartItems = savedCart ? JSON.parse(savedCart) : [];

    // Initialize states
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        shippingOption: 'free' // Default to free shipping
    });

    // Calculate total price when cartItems change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        const total = cartItems.reduce((acc, item) => {
            const quantity = item.quantity || 1; // Default quantity to 1 if undefined
            const price = parseFloat(item.price) || 0; // Ensure price is a number
            return acc + (quantity * price);
        }, 0);
        setTotalPrice(total);
    }, [cartItems]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateOrder = () => {
        if (cartItems.length === 0) {
            return 'The cart is empty.';
        }
        for (const item of cartItems) {
            if (item.quantity < 1) {
                return `Quantity for item ${item.name} must be at least 1.`;
            }
        }
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            return 'All fields are required.';
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return 'Email format is invalid.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateOrder();
        if (error) {
            alert(error);
            return;
        }
        try {
            const orderData = {
                ...formData,
                items: cartItems,
                totalPrice: totalPrice
            };
            await onSubmitOrder(orderData); // Call the parent function to handle the order submission
            setCartItems([]); // Optionally clear cart here or within onSubmitOrder
            setTotalPrice(0);
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    const handleIncrement = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            )
        );
    };

    const handleDecrement = (id) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: Math.max((item.quantity || 1) - 1, 0) // Allow quantity to go to 0
                        }
                        : item
                )
                .filter((item) => item.quantity > 0) // Filter out items with quantity 0
        );
    };

    return (
        <div className="order-completion">
            <h2>Order Summary</h2>
            <div className="order-items">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} className="order-item">
                                <img src={item.image} alt={item.title} />
                                <div className="order-item-details">
                                    <p>{item._name}</p>
                                    <p>Quantity: {item.quantity || 1}</p>
                                    <p>Price per unit: ${parseFloat(item.price).toFixed(2)}</p>
                                    <p>Total: ${((item.quantity || 1) * parseFloat(item.price)).toFixed(2)}</p>
                                    <button onClick={() => handleDecrement(item.id)}>-</button>
                                    <button onClick={() => handleIncrement(item.id)}>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="order-total">
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                </div>
            </div>
            <h2>Order Form</h2>
            <form onSubmit={handleSubmit} className="order-form">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Shipping Option:
                    <select
                        name="shippingOption"
                        value={formData.shippingOption}
                        onChange={handleChange}
                    >
                        <option value="3-day">3-Day Shipping - $10</option>
                        <option value="free">Free Shipping (14 Days)</option>
                    </select>
                </label>
                <button type="submit" onClick={handleSubmit}>Place Order</button>
            </form>
        </div>
    );
};

export default Cart;


