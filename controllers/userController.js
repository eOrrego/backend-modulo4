const { userService } = require('../services/userService');
const { encryptedData, compareData } = require('../utils/bcryptService');
const { token } = require('../utils/jwtService');
const User = require('../models/UserModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

//Cuando el usuario se registra
const createUser = async (req, res) => {
  const { password } = req.body
  try {
    const encryptPass = await encryptedData(password);
    const userSave = {
      ...req.body, 
      password: encryptPass,
      isActive: true,
    }
    await userService.saveUser(userSave);
    res.status(201).json('The user was created successfully');
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json('This email has already been registered');
    }
    res.status(500).json('Internal Server Error');
  }
};

//Cuando el usuario se loguea
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const foundUser = await userService.find(email);
    const foundUser = await User.findOne({email})
    if (!foundUser) {
      return res.status(404).json('User not found');
    }
    const correctPassword = await compareData(password, foundUser.password);
    if (!correctPassword) {
      return res.status(400).json('Invalid Credentials');
    }
    const JwtToken = token({id: foundUser._id, role: foundUser.role});
    res.status(200). json(JwtToken);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}

module.exports = {
  getAllUsers,
  createUser,
  login,
};
