const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  products: {
    type: Sequelize.JSON
  }
})

module.exports = Cart

Cart.prototype.addProductToCart = function(productId) {
  if (this[productId]) {
    this[productId] += 1
  } else {
    this[productId] = 1
  }
}
