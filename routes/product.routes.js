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
    router.get('/',  productController.findAll);
    router.post('/', productController.create);
    router.get('/:id', productController.findOne);
    router.put('/:id', productController.updateProduct);
    router.delete('/:id', productController.delete);
}