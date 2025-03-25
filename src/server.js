// config dotenv
require('dotenv').config()
// config express
const express = require('express')
const Authrouter = require('./routes/auth')
const apiRouter = require('./routes/api')
const errorMiddlewares = require('./middlewares/error-middlewares')

const app = express()
app.use(express.json())

// ROTAS /AUTH
app.use('/auth', Authrouter)

// ROTAS /api
app.use('/api', apiRouter)

// Middleware de erro
app.use(errorMiddlewares)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Servidor iniciado\n http://localhost:${PORT}`))
