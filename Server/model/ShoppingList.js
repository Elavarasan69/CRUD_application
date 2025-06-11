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

module.exports = mongoose.models.shopping_list || mongoose.model("shopping_list",ShoppingItem)
