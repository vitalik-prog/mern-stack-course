const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Link' }]
})

module.exports = mongoose.model('User', schema)
