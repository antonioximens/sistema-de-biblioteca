const HttpsError = require('../errors/HttpsError')
const booksModel = require('./books-model')

const uuid = require('uuid').v4
const loans = [
    {
        id: '1',
        userId: '1',
        bookId: '1',
        loanDate: new Date('2025-01-01'),
        returnDate: null,
        isReturne: false,
        isLater: true
    }
]

module.exports = {
    getAllLoans: () => loans,

    getByIdLoans: (id) => loans.find(loan => loan.id === id),

    createLoan: (user, book) => {
        if(book.quantityAvailable < 1) throw new HttpsError(400, 'Não há quantidade sufuciente!.')
        
        // adicionando 14 dias para emprestar o livro
        const today = new Date()
        const returnDate = new Date()
        returnDate.setDate(today.getDate() + 14)

        const newLoan = { 
            id: uuid(),
            userId: user.id,
            bookId: book.id,
            loanDate: today,
            returnDate: returnDate,
            isReturne: false,
            isLater: false
        }

        loans.push(newLoan)
        booksModel.takeBook(book.id)
        return newLoan
    },

    returnLoan: (id) => {
        const loanIndex = loans.findIndex(loan => loan.id === id)

        if(loanIndex === -1) throw new HttpsError(404, 'Emprestimo não encontrado!')

        const loan = loan[loanIndex]
        if(loan.isReturne) return null

        // retornando o livro
        loan.isReturne = true

        
        const today = new Date()
        // verificando se está atrasado
        const limitDate = new Date(loan.loanDate)
        loan.isLater = today > limitDate
        loan.returnDate = today

        const book = booksModel.returnBook(book.id)
        return loan
    }
}