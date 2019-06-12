const router = require('express').Router()
const {User, Order, orderPrd} = require('../db/models')

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId, {
//       include: {model: Cart}
//     })
//     if (user.cartId) {
//       req.status(200).send(await Cart.findByPk(user.cartId))
//     } else {
//       // let newCart = Cart.create()
//     }
//   } catch (error) {
//     next(error)
//   }
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
      res.status(202).send(order)
    } else {
      let newOrderRow = await orderPrd.create({
        productId: req.body.productId,
        orderId: req.params.orderId,
        quantity: 1
      })
      res.status(202).send(newOrderRow)
    }
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
      res.status(202).send('deleted!')
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
      order.update({quantity: req.body.quantity})
      res.status(202).send(order)
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
      order.update({completed: true})
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
