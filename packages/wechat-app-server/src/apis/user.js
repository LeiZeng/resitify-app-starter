import mongoose from 'mongoose'
const User = mongoose.model('User')

export const login = (req, res, next) => {
  const { username, password } = req.body
  User.create({
    name: username,
    password: password
  }, (err, user) => {
    if (err) {
      next(err)
    }
    res.send(200, user)
  })
}

export const hello = (req, res, next) => {
  const name = req.query.name || 'unknown'
  res.send(200, `Hello ${name}!`)
  next()
}
