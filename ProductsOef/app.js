var express = require('express');
var bodyParser = require('body-parser');
var productList = require("./products");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var products = productList;

//CRUD Operations
app.get('/api/Products', (req, res) => {
    return res.status(200).send({
        products: products.products
    })
});

app.post('/api/addProduct', (req, res) => {
    if (!req.body.price || !req.body.name || !req.body.brand || !req.body.description) {
        res.status(400);
        res.json({
            message: 'Bad request sir!'
        });
    } else {
        var productId = 0;
        productId++;

        products.products.push({
            id: productId,
            price: req.body.price,
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            link: `/products/${productId}`
        });
        res.json({
            message: `Product with id: ${productId} has succesfully been created!`
        })
    }
});

app.delete(`/api/deleteProduct/:id`, (req, res) => {
    var removeIndex = products.products.map(function(product) {
        return product.id;
    }).indexOf(req.params.id);

    if(removeIndex === -1) {
        res.json({message: "Not found!"});
    } else {
        products.products.splice(removeIndex, 1);
        res.send({message: "Product id: " + req.params.id + " succesfully removed!"})
    }
})

app.put('/api/updateProduct/:id', (req, res) => {

    var foundProductWithId = products.products.find(obj => obj.id === req.params.id);

    const newProduct = {
        id: foundProductWithId.id,
        price: req.body.price,
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        link: foundProductWithId.link
    }
    if(foundProductWithId !== null) {
        var indexProductToUpdate = products.products.findIndex(obj => obj.id === req.params.id);
        products.products[indexProductToUpdate] = newProduct;

        return res.send({message: "Product id: " + req.params.id + " succesfully updated!"})
    } else throw new res.send(400);
})

app.listen(3000, () => {
    console.log("App is running on port 3000!")
});