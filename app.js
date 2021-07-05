const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect("mongodb+srv://root:" + process.env.MONGO_ATLAS_PW + "@node-rest-shop.yjzup.mongodb.net/Shop-Database?retryWrites=true&w=majority");
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header( 'Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Using the Routes to handle the Specified Requests!
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;