const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router
const stripe = require('stripe')('sk_test_tjWlFFD447mw8htkrmXiorw3009wcWw6Wt')

const uuid = require('uuid/v4')

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

router.get('/orders/checkout', async (req, res) => {
  res.send(`Add your Stripe Secret Key to the .require('stripe" statement!`)
})

router.post('/checkout', async (req, res, next) => {
  console.log('Request:', req.body)
  let error
  let status
  try {
    const {product, token} = req.body
    console.log('this is the req.body:', req.body)
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })
    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    )
    console.log('Charge:', {charge})
    status = 'success'
  } catch (err) {
    console.error('Error:', err)
    status = 'failure'
  }

  res.json({error, status})
})
