const express = require('express');
const mongoose = require('mongoose');

// Create a new express app
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Define the Order schema and model
const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    orderDate: Date,
    status: String
});

const Order = mongoose.model('Order', orderSchema);

// POST route to create a new order
app.post('/orders', async (req, res) => {
    const { name, email, phone, address, orderDate, status } = req.body;

    const order = new Order({
        name,
        email,
        phone,
        address,
        orderDate,
        status
    });

    try {
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).send('Error saving order');
    }
});

// GET route to retrieve all orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (err) {
        console.error('Error retrieving orders:', err);
        res.status(500).send('Error retrieving orders');
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
