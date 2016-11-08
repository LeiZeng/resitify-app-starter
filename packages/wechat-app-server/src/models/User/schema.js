import { Schema } from 'mongoose'

export default Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  nickname: String,
  password: {
    type: String,
    required: true
  },
  uid: String,
  phone: String,
  email: String
})
