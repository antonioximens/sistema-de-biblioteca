const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

const users = [
    {id: 1, name: 'Marcos', email: 'marcos@gmail.com', password: '123456'},
    {id: 2, name: 'Pedro', email: 'Pedro@gmail.com', password: '123456'}
]

// crud
module.exports = {

    getAllUsers: () => users,

    getByIdUser: (id) => users.find(user => user.id === id),

    getByEmailUser: (email) => users.find(user => user.email === email),

    createUser: (name, email, password) => {
        const newUser = {
            id: uuid(),
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        }

        users.push(newUser)
        return newUser
    }
}