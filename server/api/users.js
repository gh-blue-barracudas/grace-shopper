const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Route to grab order information from userId
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: {
        model: Order
      }
    })
    if (user) {
      res.status(200).send({
        orders: user.orders
      })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

// Route to update/store the billing address/shipping address for every user
router.put('/:userId/address', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (user) {
      user.update({
        billingAddress1: req.body.billingAddress1,
        billingAddress2: req.body.billingAddress2,
        billingCity: req.body.billingCity,
        billingState: req.body.billingState,
        billingZip: req.body.billingZip,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        shippingCity: req.body.shippingCity,
        shippingState: req.body.shippingState,
        shippingZip: req.body.shippingZip
      })
      res.status(202).send(user)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})
