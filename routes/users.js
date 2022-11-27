const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, login } = require('../controllers/userController');

//Estructura de una ruta
//router + tipo de pertición (GET, POST, PUT, PATH, DELETE)
// + midleware (OPCIONAL) + CONTROLLER
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post('/login', login);


module.exports = router;
