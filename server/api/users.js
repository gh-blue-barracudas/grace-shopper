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

router.get('/orders', async (req, res, next) => {
  try {
    if (req.user) {
      const userOrders = await Order.findAll({
        where: {
          userId: req.user.id,
          completed: true
        }
      })
      res.json(userOrders)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

router.get('/profile', async (req, res, next) => {
  try {
    if (req.user) {
      const userInfo = await User.findOne({
        where: {
          id: req.user.id
        }
      })
      res.json(userInfo)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/address', async (req, res, next) => {
  try {
    if (req.user) {
      await User.update(
        {
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
        },
        {
          where: {id: req.user.id},
          returning: true,
          plain: true
        }
      )
      res.sendStatus(202)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/homeInfo', async (req, res, next) => {
  try {
    if (req.user) {
      let [numOfAffectedUsers, affectedUsers] = await User.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        },
        {
          where: {id: req.user.id},
          returning: true,
          plain: true
        }
      )
      res.status(202).send(affectedUsers)
    }
  } catch (error) {
    next(error)
  }
})
