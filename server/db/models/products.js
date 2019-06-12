const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      isDecimal: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.livescience.com/63459-dream-genes-rem-sleep.html'
  },
  description: {
    type: Sequelize.TEXT
  },
  productType: {
    type: Sequelize.ENUM('dream', 'nightmare')
  }
})

module.exports = Product
