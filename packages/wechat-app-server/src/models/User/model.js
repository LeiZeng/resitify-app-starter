import mongoose from 'mongoose'
import UserSchema from './Schema'

const User = mongoose.model('User', UserSchema)

export default User
