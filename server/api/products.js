const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [{all: true}]})
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findById({
      where: {
        id: req.params.productId
      }
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
