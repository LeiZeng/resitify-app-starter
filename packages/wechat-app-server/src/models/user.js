import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'
import md5 from 'md5'

export const Schema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  username: { type: String, unique: true },
  avatar: String,
  password: String,
  locale: { type: String, default: 'en-us' }
})

Schema.plugin(findOrCreate)

Schema.statics.findByName = function(username, cb) {
  const model = this

  return new Promise(function(resolve, reject) {
    model.find(
      { username },
      (err, user) => err ? reject(err) : (user && resolve(user[0]))
    )
  })
}

Schema.statics.findOrCreateUser = function(data) {
  const model = this
  const { username, avatar, locale } = data
  const password = md5(data.password)

  return new Promise((resolve, reject) => {
    model.findOrCreate(
      { username, password }, { username, avatar, locale },
      (err, user) => err ? reject(err) : resolve(user)
    )
  })
}

Schema.statics.auth = function(username, password) {
  const model = this
  return new Promise(function(resolve, reject) {
    model.findByName(username)
    .then(user => {
      console.log(user, username, password);

      if (!user) {
        return resolve(null)
      }
      if (user.password === password) {
        return resolve(user)
      }
      resolve(null)
    })
  })
}

Schema.methods.isValidPassword = function(password) {
  return this.password === md5(password)
}

const User = mongoose.model('User', Schema)
