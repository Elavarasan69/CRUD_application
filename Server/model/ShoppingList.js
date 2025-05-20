const mongoose = require('mongoose')

const ShoppingItem = mongoose.Schema({
    product: String,
    quantity: String,
    unit: String,
    istaken: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("shopping_list",ShoppingItem)