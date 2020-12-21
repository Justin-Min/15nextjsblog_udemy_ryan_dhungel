const User = require('../models/user')

exports.read = (req, res) => {
  req.profile.hashed_password = undefined
  console.log(req.profile)
  return res.json(req.profile)
}
