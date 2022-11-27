const mongoose = require('mongoose');
const { Schema } = mongoose;
const { roles } = require('../constants/enum');

const userSchema = new Schema({
  name: { 
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: roles,
    default: roles.CLIENTE,
  },
  isActive: Boolean,
  deletedAt: Date,
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
  versionKey: false,
}
)

module.exports = mongoose.model('users', userSchema);