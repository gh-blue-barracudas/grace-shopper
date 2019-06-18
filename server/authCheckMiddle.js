const {User, Order} = require('./db/models')
module.exports = (function() {
  return async function(req, res, next) {
    if (req.user) {
      const user = await User.findByPk(req.user.id)
      const loggUser = await Order.findOne({
        where: {session: req.session.id, userId: req.user.id, completed: false}
      })
      if (user.admin) {
        next()
      } else if (loggUser) {
        next()
      } else {
        const guestOrder = await Order.findOne({
          where: {session: req.session.id, completed: false}
        })
        if (guestOrder) {
          next()
        } else {
          var err = new Error(
            `Stop trying to hack people's dreams. You're a nightmare.`
          )
          err.status = 401
          next(err)
        }
      }
    }
  }
})()
