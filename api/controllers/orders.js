const Order = require('../models/order');
const mongoos = require('mongoose');

exports.order_gets_all = (req, res, next) => {
    Order.find()
    .populate('product')
    .exec()
    .then(
        docs => {
            if(docs.length >= 0) {
                const response = {
                    totalOrders: docs.length,
                    orders: docs.map( doc => {
                        return {
                            oderId: doc._id,
                            product: doc.product,
                            quantity: doc.quantity
                        }
                    } )
                }
                res.status(200).json(response);
            }
            else {
                res.status(404).json(
                    {
                        message: "No Orders Could Find!"
                    }
                )
            }
        }
    )
    .catch( err => {
        res.status(500).json(err);
    } )
}

exports.create_order = (req, res, next) => {
    const order = new Order({
        _id: mongoos.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });

    order
    .save()
    .then( result => {
        const response = {
            message: 'Order has Been Saved',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + result._id
            }
        }
        res.status(201).json(response);
    } )
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

exports.get_order = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
    .select('product _id quantity')
    .populate('product')
    .exec()
    .then( doc => {
        const response = {
            order: doc,
            request: {
                type: "GET",
                url: "http://localhost:3000/orders"
            }
        }
        res.status(200).json(response);
    } )
    .catch(err => {
        res.status(500).json(err);
    })
}

exports.update_order = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.update(
        {
            _id: orderId
        },
        {
            $set: { quantity: req.body.quantity }
        }
    )
    .exec()
    .then( result => {
        const response = {
            message: 'The Order Has Been Updated!',
            request: {
                type: "GET",
                url: "http://localhost:3000/orders/"
            }
        }
        res.status(200).json(response);
    } )
    .catch(err => {
        res.status(500).json(err);
    })
}

exports.delete_order = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.remove(orderId)
    .exec()
    .then( result => {
        res.status(200).json(
            {
                message: 'The Order Has Been Deleted!'
            }
        )
    } )
    .catch( err => {
        res.status(500).json(err)
    })
}
