const router = require('express').Router()
const {User, Cart} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: {model: Cart}
    })
    if (user.cartId) {
      req.status(200).send(await Cart.findByPk(user.cartId))
    } else {
      // let newCart = Cart.create()
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error)
  }
})

module.exports = router
