const User = require('../models/UserModel');

const userService = {
  findAll: async () => {
    return await User.find();
  },
  saveUser: async (user) => {
    const newUser = new User(user);
    await newUser.save();
  },
  find: async (data) => {
    console.log(data);
    await User.find({email: data})
  }
};

module.exports = { userService };
