const Product = require('../models/Product');


const getProducts = async (req, res) => {
    const products = await Product.find({});
    if (products) {
        res.status(200).json(products);
    } else {
        res.status(400).json({ error: "Cannot retrieve products" });
    }
}

module.exports = { getProducts }