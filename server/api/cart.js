const router = require('express').Router()
const {Order, orderPrd, Product} = require('../db/models')

// to get persistant cart
router.get('/', async (req, res, next) => {
  try {
    let allOrders = await Order.findAll({
      where: {
        session: req.sessionID,
        completed: false
      },
      include: [{model: Product}]
    })
    res.status(200).send(allOrders[0])
  } catch (error) {
    next(error)
  }
})

// to add a cart
router.post('/', async (req, res, next) => {
  try {
    //if signed in user has open cart, load that cart
    //if they are signed in and dont have an open cart,
    //then create below

    let cart = await Order.findOrCreate({
      where: {session: req.sessionID, completed: false}
    })
    res.status(201).send(cart[0])
  } catch (error) {
    next(error)
  }
})

//if guest => user, now we have a passport.user, then i want to update the above instance

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
      await order.update({
        quantity: order.quantity + 1
      })
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

    res.status(202).send(allOrders[0])
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
      await order.destroy()
      let allOrders = await Order.findAll({
        where: {
          id: req.params.orderId
        },
        include: [{model: Product}]
      })
      res.status(202).send(allOrders[0])
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
      res.status(202).send(allOrders[0])
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
      if (req.user) {
        await order.update({
          userId: req.user.id,
          completed: true,
          total: req.body.total
        })
      } else {
        await order.update({completed: true, total: req.body.total})
      }
      res.status(202).send('completed')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
