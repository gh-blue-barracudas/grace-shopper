const router = require('express').Router()
const {Order, orderPrd, Product} = require('../db/models')

// to get persistant cart
// router.get('/:orderId', async (req,res,next) => {
// try {
//
// } catch (error) {
//   next(error)
// }
// })

// to add a cart
router.post('/', async (req, res, next) => {
  try {
    let cart = await Order.create({session: 'placeholderSession'})
    res.status(200).send(cart)
  } catch (error) {
    next(error)
  }
})

// to add products to the cart
router.put('/:orderId/addProduct', async (req, res, next) => {
  try {
    // Find order
    let order = await orderPrd.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.body.productId
      }
    })
    // Check if there is a row in the orderPrd table where this order is associated with the productId that we're sending in the req.body
    if (order) {
      await order.update({quantity: order.quantity + 1})
    } else {
      await orderPrd.create({
        productId: req.body.productId,
        orderId: req.params.orderId,
        quantity: 1
      })
    }
    let allOrders = await Order.findAll({
      where: {
        id: req.params.orderId
      },
      include: [{model: Product}]
    })

    res.status(202).send(allOrders)
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId/deleteProduct', async (req, res, next) => {
  try {
    let order = await orderPrd.findOne({
      where: {orderId: req.params.orderId, productId: req.body.productId}
    })
    if (order) {
      order.destroy()
      let allOrders = await Order.findAll({
        where: {
          id: req.params.orderId
        },
        include: [{model: Product}]
      })
      res.status(202).send(allOrders)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId/editProdQuantity', async (req, res, next) => {
  try {
    let order = await orderPrd.findOne({
      where: {orderId: req.params.orderId, productId: req.body.productId}
    })
    if (order) {
      await order.update({quantity: req.body.quantity})
      let allOrders = await Order.findAll({
        where: {
          id: req.params.orderId
        },
        include: [{model: Product}]
      })
      res.status(202).send(allOrders)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

// for when user has placed order - edit status of order route
router.put('/:orderId/completedOrder', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.orderId)
    if (order) {
      await order.update({completed: true})
      res.status(202).send('completed')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
