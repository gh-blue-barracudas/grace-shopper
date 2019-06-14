const User = require('./user')
const Product = require('./products')
const Order = require('./order')
const orderPrd = require('./orderPrd')

// User.hasMany(Order)
// Order.belongsTo(User)
Order.belongsToMany(Product, {through: 'orderPrd'})
Product.belongsToMany(Order, {through: 'orderPrd'})

module.exports = {
  User,
  Product,
  Order,
  orderPrd
}
