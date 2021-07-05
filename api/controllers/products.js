const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_products = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map( doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    }
                } )
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "The Products Could Not Find!"
            });
        });
}

exports.save_product = (req, res, next) => {
    console.log(req.file);
    const product = new Product( {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    } );

    product.save()
    .then( result => {
        res.status(201).json({
            message: 'Handling the Post Request at /Products',
            createdProduct: {
                name: result.name,
                price: result.price,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/'
                }
            }
        })
    } )
    .catch( err => {
        console.log(err);
        res.status(500).json( { error: err } );
    } );
}

exports.get_product = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .select('name price _id')
    .exec()
    .then( doc => {
        if (doc){
            const response = {
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products'
                }
            }
            res.status(200).json(response);
        }else {
            res.status(404).json( {
                message: "The Object with ID Cannot Find!"
            } )   
        }
    } )
    .catch (err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.update_product = (req, res, next) => {
    const productId = req.params.productId;
    Product.update(
        {
            _id: productId
        },
        {
            $set: {name: req.body.name, price: req.body.price}
        }
    )
    .select('name price _id')
    .exec()
    .then( result => {
        const response = {
            product: result,
            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" + result._id
            }
        }
        res.status(200).json(result);
    } )
    .catch(err => {
        res.status(500).json(result);
    })
}

exports.delete_product = (req, res, next) => {
    const productId = req.params.productId;
    Product.remove(
        {
            _id: productId
        }
    )
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'The Product Has Been Deleted!'
        });
    })
    .catch(err => {
        res.status(500).json(err);
    })
}