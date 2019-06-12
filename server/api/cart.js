const router = require('express').Router()
const {User, Cart} = require('../db/models')

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
    let cart = await Cart.create()
    res.status(200).send(cart)
  } catch (error) {
    next(error)
  }
})

// to add products to the cart
router.put('/:cartId/addProduct', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Cart.update(
      {id: req.params.cartId},
      {where: {products: req.body.products}, returning: true, plain: true}
    )
    res.status(200).send(affectedRows[0])
  } catch (error) {
    next(error)
  }
})

router.put('/:cartId/deleteProduct', async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error)
  }
})

router.put('/:cartId/editProdQuantity', async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error)
  }
})

router.delete('/:cartId', async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error)
  }
})

module.exports = router
