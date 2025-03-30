const HttpsError = require('../errors/HttpsError')
const uuid = require('uuid').v4

// model data
let books = [
    {id: 1, name: 'Book One', author: 'Author One', quantityAvailable: 4},
    {id: 2, name: 'Book Two', author: 'Author Two', quantityAvailable: 4}
]

module.exports = {
    getAllBooks: () => books.map(book => ({id: book.id, name: book.name})),

    getByIdBook: (id) => books.find( book => book.id === id),

    createBook: (name, author, quantityAvailable) => {
        const newBook = {
            id: uuid(),
            name,
            author,
            quantityAvailable
        }

        books.push(newBook)
        return newBook
    },

    updateBook: (id, updateBook) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new HttpsError(404,`Livro não encontrado!`)

        books[bookIndex] = {...books[bookIndex],...updateBook}
        return books[bookIndex]
    },

    deleteBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new Error(404, `Livro não encontrado!`)
        const deletedBook = books[bookIndex]
        books = books.filter(book => book.id !== id )
        return deletedBook
            
    },

    takeBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new Error(404, `Livro não encontrado!`)

        books[bookIndex].quantityAvailable -= 1
    },

    returnBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new Error(404, `Livro não encontrado!`)

        books[bookIndex].quantityAvailable += 1
    }
}