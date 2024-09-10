
const express = require('express');
const { Productsdb } = require("./Database/productsdb")
const cors = require('cors');
const mongojs = require('mongojs');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { ObjectId } = mongojs;

// Define Mongoose schema for orders
const productSchema = new mongoose.Schema({
    name: String,
    id: String,
    image: String,
    count: String,
    
    
});
const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true },
    name: String,
    email: String,
    phone: String,
    address: String,
    shippingOption: String,
    items: [
        {
            id: String,
            title: String,
            quantity: Number,
            price: Number
        }
    ],
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now }
});

// Connect to MongoDB
//mongoose.connect("mongodb://localhost:27017/orders", { // Correcting the port to 27017, default MongoDB port
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//}).then(() => {
//    console.log('Connected to local MongoDB');
//}).catch(err => {
  //  console.error('Error connecting to local MongoDB:', err);
//});

// Connect to MongoDB Atlas
const db = mongojs('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024', ['final_<Dima_Tamar>_products'],['final_<Dima']);
const db2 = mongojs('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024', ['final_<Dima_May>_orders']);
const products_coll = db.collection('final_<Dima Ignatiev_May_Tamar>_products');
const orders_coll = db2.collection('final_<Dima Ignatiev_May_Tamar>_orders');
const Order = mongoose.model('Order', orderSchema, 'final_<Dima_Tamar>_orders');
// Orders collection
const sampleDocument = [{
    image: "./Products/Caterpillar_Outdoor.jpg",//1
    productName: "Altama Outdoor",
    price: 19.99,
    Text: "Running shoes",
}, {
    image: "./Products/Asics_Nimbus.jpg",//2
    productName: "Asics-Nimbus",
    price: 19.99,
    Text: "Running shoes",
}, {
    image: "./Products/Altama_Outdoor.jpg",//3
    productName: "Altama Outdoor.jpeg",
    price: 19.99,
    Text: "Running shoes",
}, {
    image: "./Products/Lowa_outdoor.jpg",//4
    productName: "Lowa outdoor",
    price: 19.99,
    Text: "Running shoes",
}, {
    image: "./Products/Nortiv8_Tactical.jpg",//5
    productName: "Nortiv8_Tactical",
    price: 19.99,
    Text: "Running shoes",

}, {
    image: "./Products/UnderArmout.jpg",//6
    productName: "Under Armour",
    price: 19.99,
    Text: "Running shoes",
}, {
    image: "./Products/Adidas_Adizero.jpg",//7
    productName: "Adidas Adizero",
    price: 19.99,
    Text: "Running shoes",
}, {
    image: "./Products/Nortiv8_Tactical.jpg",//8
    productName: "Nortiv8_Tactical",
    price: 19.99,
    Text: "Running shoes",
}, {
    image: "./Products/Ahla_shoes.jpeg",//9
    productName: "Ahla shoes",
    price: 19.99,
    Text: "Running shoes",
}

    

];
const sampleOrder = new Order({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Anytown, USA",
    shippingOption: "Standard",
    items: [
        {
            id: "product1",
            title: "Altama Outdoor",
            quantity: 2,
            price: 19.99
        },
        {
            id: "product2",
            title: "Asics Nimbus",
            quantity: 1,
            price: 19.99
        }
    ],
    totalPrice: 59.97
});
products_coll.save(sampleDocument);
orders_coll.save(sampleOrder);
// Save the document to the collection

const app = express();
app.use(express.json()); // Middleware to parse JSON body
app.use(cors());
// Serve static files from the 'static' directory
app.use(express.static('static'));
app.use(express.static('index.html'));
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'static', '/index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending index.html:", err);
            res.status(500).send("Error sending index.html");
        }
    });
});
app.get('/products', (req, res) => {
    products_coll.find({}).toArray(function (err, products) {  // Make sure to use a regular function for the callback
        if (err) {
            console.error("Error finding products:", err);
            res.status(500).send('Error retrieving products'); // Send error response
        } else {
            res.json(products); // Send all documents as JSON response
        }
    });
});
app.post('/orders', async (req, res) => {
    const { name, email, phone, address, shippingOption, items, totalPrice } = req.body;

    // Validate input
    if (!name || !email || !phone || !address || !Array.isArray(items) || totalPrice === undefined) {
        return res.status(400).send('Invalid input');
    }

    const order = new Order({
        name,
        email,
        phone,
        address,
        shippingOption,
        items,
        totalPrice
    });

    try {
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).send('Error saving order');
    }
});
app.get('/orders', (req, res) => {
    orders_coll.find({}).toArray(function (err, orders) {
        if (err) {
            console.error('Error fetching orders:', err);
            res.status(500).send('Error retrieving orders');

        } else {
            res.json(orders);
        }
    });
});
// Start the serve
const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
