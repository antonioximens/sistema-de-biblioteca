const express = require('express')
const booksController = require('../controllers/books-controller')
const apiRouter = express()

apiRouter.get('/books', booksController.index)
apiRouter.get('/books/:id', booksController.show)

// rotas com admin
apiRouter.post('/books', booksController.save)
apiRouter.put('/books/:id', booksController.updateBook)
apiRouter.delete('/books/:id', booksController.deleteBook)

module.exports = apiRouter