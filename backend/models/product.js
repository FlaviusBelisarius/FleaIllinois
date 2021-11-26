var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        default: ""
    },
    productPrice: {
        type: Number, 
        default: 0.0
    },
    productImage: {
        type: String,
        default: ""
    },
    sellerID: {
        type: String,
        default: ""
    },
    sellerName: {
        type: String,
        default: ""
    },
    forSell: {
        type: Boolean,
        default: false
    },
    buyer: {
        type: String,
        default: ""
    },
    buyerID: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Product', ProductSchema);
