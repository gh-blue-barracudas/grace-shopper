const User = require('./user')
const Product = require('./products')
const Cart = require('./cart')

User.hasOne(Cart)
Cart.belongsTo(User)

module.exports = {
  User,
  Product,
  Cart
}
