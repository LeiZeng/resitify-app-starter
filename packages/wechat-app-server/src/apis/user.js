import mongoose from 'mongoose'
const User = mongoose.model('User')

export const login = (req, res, next) => {
  const { username, password } = req.body
  console.log(username, password)

  User.auth(username, password)
    .then(user => {
      if (!user) {
        return res.send(401)
      }
      res.send(200, user)
    })
    .catch(next)
}
