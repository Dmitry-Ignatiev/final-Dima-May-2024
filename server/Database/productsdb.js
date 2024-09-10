const mongoose = require('mongoose');
const ProductsScheme = new mongoose.Schema({
	image: { type: String },
	name: { type: String },
	description: { type: String },
	price: { type: Number }
},
	{
		collection: 'final_<Dima Ignatiev>_products'
	})
const Productsdb = mongoose.model('final_<Dima Ignatiev>_products', ProductsScheme)
module.exports = { Productsdb }