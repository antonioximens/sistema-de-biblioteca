const booksModel = require("../models/books-model")

module.exports = {
    // GET /api/books
    index: (req, res) => {
        const allBooks = booksModel.getAllBooks()
        return res.status(200).json(allBooks)
    },
    // GET /api/books/:id
    show: (req, res) => {
        const {id} = req.params

        const book = booksModel.getByIdBook(id)
        if(!book) return res.status(404).json({message: `Livro não encontrado!`})
        
        return res.status(200).json(book)
    },
    // POST /api/books
    save: (req, res) => {
        const {name, author, quantityAvailable} = req.body

        if (typeof name !== 'string' || typeof author !== 'string' || typeof quantityAvailable !== 'number') {
            return res.status(400).json({ message: 'Campos inválidos.' })
        }
        
        const newBook = booksModel.createBook(name, author, quantityAvailable)
        return res.status(201).json(newBook)
    },

    // PUT /api/books/:id
    updateBook: (req, res) => {
        const {id} = req.params
        const {name, author, quantityAvailable} = req.body
        const fieldsToUpdate = {}

        if(!id) return res.status(404).json({ message: `Livro não encontrado!`}) 
        if(typeof name !== 'string' || typeof author !== 'string' || typeof quantityAvailable !== 'number'){
            return res.status(400).json({message: `Informações invalidas!`})
        }
        
        if(name) fieldsToUpdate.name = name
        if(author) fieldsToUpdate.author = author
        if(quantityAvailable) fieldsToUpdate.quantityAvailable = quantityAvailable

        const bookUpdate = booksModel.updateBook(id, fieldsToUpdate)
        return res.status(200).json(bookUpdate)
        
    },

    //DELETE /api/books/:id
    deleteBook: (req, res) => {
        const {id} = req.params
        const bookDelete = booksModel.deleteBook(id)
        return res.status(200).json(bookDelete)
    }

}