const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.post('/register', UserController.Signup);
router.post('/login', UserController.Login);

router.get('/logout', UserController.Logout);

module.exports = router;