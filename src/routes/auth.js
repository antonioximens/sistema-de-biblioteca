const express = require('express')
const authController = require('../controllers/auth-controller')
const { ensureAuth } = require('../middlewares/auth-middleware')

const Authrouter = express()

Authrouter.post('/register', authController.register)
Authrouter.post('/login', authController.login)

Authrouter.get('/test', ensureAuth, (req, res) => res.json('OK'))

module.exports = Authrouter