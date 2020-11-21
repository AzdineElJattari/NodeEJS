var router = require("express").Router();
var path = require("path");
var productController = require("../controllers/product.controller")


let data = [
    { id: 1, title: 'Create a project',  order: 1, completed: true, createdOn: new Date() },
    { id: 2, title: 'Take a cofféé',     order: 2, completed: true, createdOn: new Date() },
    { id: 3, title: 'Write new article', order: 3, completed: true, createdOn: new Date() },
    { id: 4, title: 'Walk toward home', order: 4, completed: false, createdOn: new Date() },
    { id: 5, title: 'Have some dinner', order: 5, completed: false, createdOn: new Date() },
];

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render(path.resolve('../ProductsOefMongo/views/Home.ejs'), {products: productController.findProduct.Data});
        console.log(productController.findProduct.Data)
    });
    /*router.get('/get', productController.findProduct);
    router.post("/", productController.create);
    router.get('/:name', productController.findOne);
    router.put('/:name', productController.updateProduct);
    router.delete('/:name', productController.delete);*/
}