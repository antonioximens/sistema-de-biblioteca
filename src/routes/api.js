const express = require('express')
const booksController = require('../controllers/books-controller')
const loansController = require('../controllers/loans-controller')
const {ensureAuth} = require('../middlewares/auth-middleware')
const apiRouter = express()

apiRouter.get('/books', booksController.index)
apiRouter.get('/books/:id', booksController.show)

// rotas com admin
apiRouter.post('/books', booksController.save)
apiRouter.put('/books/:id', booksController.updateBook)
apiRouter.delete('/books/:id', booksController.deleteBook)

//rotas de loans
apiRouter.get('/loans', loansController.index)
apiRouter.get('/loans/:id', loansController.show)
apiRouter.post('/loans', ensureAuth ,loansController.save)
apiRouter.post('/loans/:id/reutrn', loansController.return)

module.exports = apiRouter