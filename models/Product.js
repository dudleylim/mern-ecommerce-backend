const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    categoryId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    buyCount: {
        type: Number,
        required: true,
    },
    remaining: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,        
    }
}, { timestamps: true })


module.exports = mongoose.model('Product', productSchema);