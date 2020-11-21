var mongoose = require('mongoose');
var productSchema = require('../models/product.model');

productSchema.statics = {
    create : function(data, cb) {
        var product = new this(data);
        product.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var productModel = mongoose.model('collection', productSchema);
module.exports = productModel;