const router = require('express').Router()
const {Order, orderPrd, Product} = require('../db/models')

//add router post to add sessions to the Order
router.post('/', async (req, res, next) => {
  try {
    let cart
    //if user is logged in, add the passport.user
    if (req.session.passport.user) {
      cart = await Order.findOrCreate({
        where: {session: req.sessionID},
        defaults: {userId: req.session.passport.user}
      })
    } else {
      cart = await Order.findOrCreate({
        where: {session: req.sessionID}
      })
    }
    res.status(200).send(cart)
  } catch (error) {
    next(error)
  }
})

//idea on what would happen if a user was a Guest, and then they signed in.
//passport.user exists now, so you need to update the order's userId based on the sessionId
router.put('/', async (req, res, next) => {
  const passUser = req.session.passport.user
  try {
    if (passUser) {
      let cart = await Order.update(
        {userId: passUser},
        {where: {session: req.sessionID}, returning: true, plain: true}
      )
      res.status(200).send(cart[1])
    }
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
