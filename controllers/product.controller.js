const Product = require("../models/product.model");

exports.create = (req, res) => {

    if (!req.body.name || !req.body.price || !req.body.brand || !req.body.description) {
        return res.status(400).send({
            message: "Required field(s) can not be empty!",
        });
    }
    /**
     * Create a user
     */
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        description: req.body.description,
    });
    /**
     * Save user to database
     */
    product
        .save()
        .then((data) => {
            res.redirect(301, "/")
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product.",
            });
        });
};
exports.findAll = (req, res) => {
    Product.find({}, function (err, docs) {
        if(err) {
            throw err;
        }
        res.render('Home.ejs', {products: docs});
  });
};
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id,
                });
            }
            res.status(200).send(product);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving product with id " + req.params.id,
            });
        });
};
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found",
                });
            }
            /*res.send({
                message: "Product deleted successfully!"
            });*/
            res.redirect(301, "/");
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete product",
            });
        });
};
exports.updateProduct = (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.brand || !req.body.description) {
        res.status(400).send({
            message: "Required fields cannot be empty",
        });
    }
    User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then((product) => {
            if (!product) {
                return res.status(404).send({
                    message: "No product found",
                });
            }
            res.status(200).send(user);
        })
        .catch((err) => {
            return res.status(404).send({
                message: "Error while updating the product!",
            });
        });
};