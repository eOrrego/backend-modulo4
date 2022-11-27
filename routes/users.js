const express = require('express');
const { roles } = require('../constants/enum');
const router = express.Router();
const { getAllUsers, createUser, login, deleteUser, getOneUser, updateUser } = require('../controllers/userController');
const { isLoggedIn, checkRole } = require('../middleware/auth');

//Estructura de una ruta
//router + tipo de pertición (GET, POST, PUT, PATH, DELETE)
// + midleware (OPCIONAL) + CONTROLLER


//router.get('/users', MIDDLEWARE ,getAllUsers);

router.get('/users', isLoggedIn, getAllUsers);
router.get('/user/:id', isLoggedIn, getOneUser);
router.post('/createUser', createUser);
router.post('/login', login);
router.delete('/users/:id', checkRole(roles.ADMIN), deleteUser)
router.put('/users/:id', updateUser)


module.exports = router;
