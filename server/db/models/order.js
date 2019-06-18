const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  session: {
    type: Sequelize.TEXT
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order
