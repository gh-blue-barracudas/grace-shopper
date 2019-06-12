const Sequelize = require('sequelize')
const db = require('../db')

const orderPrd = db.define('orderPrd', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = orderPrd
