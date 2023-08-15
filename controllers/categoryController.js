const Category = require('../models/Category');


const getCategories = async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    if (categories) {
        res.status(200).json(categories);
    } else {
        res.status(400).json({ error: "Cannot retrieve categories" });
    }
}

module.exports = { getCategories }