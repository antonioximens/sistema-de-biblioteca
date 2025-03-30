const HttpsError = require("../errors/HttpsError")
const loansModel = require("../models/loans-model")

module.exports = {
    //GET /api/loans
    index: (req, res) => {
        const loans = loansModel.getAllLoans()
        return res.json(loans)
    },
    
    //GET /api/loans/:id
    show: (res, req) => {
        const {id} = req.params
        const loan = loansModel.getByIdLoans(id)
        if(!loan) throw new HttpsError(404, `Empréstimo não encontrado!`)

        return res.json(loan)
    },

    //POST /api/loans
    save: (req, res) => {
        const user = req.user
        const { bookId } = req.body
    
        if (typeof bookId !== 'string') throw new HttpsError(400, 'ID de livro inválido!')
    
        const book = booksModel.getBookById(bookId)
        if (!book) throw new HttpsError(404, 'Livro não encontrado!')
        
        const newLoan = loansModel.createLoan(user, book)
        res.status(201).json(newLoan)
      },

    //POST /api/loans/:id/return
    return: (req, res) => {
        const {id} = req.params
        const loan = loansModel.returnLoan(id)
        return res.json(loan)
    }

}

