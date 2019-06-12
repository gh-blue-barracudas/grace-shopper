const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  session: {
    type: Sequelize.TEXT
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
