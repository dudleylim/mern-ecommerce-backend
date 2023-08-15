const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

// middleware if any (auth, cors, etc.)
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URI
}))

// actual routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db; listening to port ' + process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })