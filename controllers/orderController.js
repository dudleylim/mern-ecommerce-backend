const Order = require('../models/Order');
const User = require('../models/User');

const getOrders = async (req, res) => {
    const { _id } = req.user;
    const orders = await Order.find({ userId: _id }).sort({ createdAt: -1 });
    if (orders) {
        res.status(200).json(orders);
    } else {
        res.status(400).json({ error: "Cannot retrieve orders" });
    }
}

const createOrder = async (req, res) => {
    const { products } = req.body;
    const { _id } = req.user

    console.log(products);
    
    let order;
    try {
        order = await Order.create({ userId: _id, products });
    } catch (error) {
        return res.status(400).json({ error });
    }

    if (order) {
        console.log(order);
        res.status(200).json(order);
    } else {
        res.status(400).json({ error: "Order failed" });
    }
}

module.exports = { getOrders, createOrder }