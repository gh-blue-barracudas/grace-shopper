const {User, Order} = require('./db/models')

module.exports = (function() {
  return async function(req, res, next) {
    const currOrder = await Order.findOne({
      where: {session: req.session.id, completed: false}
    })
    if (currOrder) {
      return next()
    }

    if (req.user) {
      const user = await User.findByPk(req.user.id)
      if (user.admin) {
        return next()
      }
    }
    var err = new Error(
      `Stop trying to hack people's dreams. You're a nightmare.`
    )
    err.status = 401
    next(err)
  }
})()
