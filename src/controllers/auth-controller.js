const usersModel = require("../models/users-model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = { 
    // POST /auth/register
    register: (req ,res) => {
        const {name, email, password} = req.body

        // validação
        if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }

        const existingUser = usersModel.getByEmailUser(email)
        if(existingUser) return res.status(400).json({ message: `E-mail já cadastrado!`})

        const newUser = usersModel.createUser(name, email,password) 
        return res.status(201).json({...newUser, password: undefined})
    },

    //POST /auth/login
    login: (req, res) => {
        const {email, password} = req.body

        // validação
        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }

        const user = usersModel.getByEmailUser(email)

        if(!user) return res.status(404).json({ message: `Usuario não encontrado!`})
        

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if(!isValidPassword) return res.status(401).json({ message: `Credencias incorretas`})

        // gerando token
       const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY, {expiresIn: '1d'})

       res.status(200).json({token})

    }
}