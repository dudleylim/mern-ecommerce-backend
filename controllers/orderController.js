const Order = require('../models/Order');


const getOrders = async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    if (orders) {
        res.status(200).json(orders);
    } else {
        res.status(400).json({ error: "Cannot retrieve orders" });
    }
}

const createOrder = async (req, res) => {

}

module.exports = { getOrders, createOrder }