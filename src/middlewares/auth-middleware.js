const jwt = require('jsonwebtoken')
const usersModel = require('../models/users-model')

module.exports = {
    ensureAuth: (req, res, next) => {
        const headerAuth = req.headers.authorization

        if(!headerAuth) return res.status(401).json({message: `Não autorizado!`})
        
        const token = headerAuth.split(" ")[1]

        try {
            const {id} = jwt.verify(token, process.env.JWT_KEY)
            const user = usersModel.getByIdUser(id)
            if(!user) return res.status(404).json({ message: `Usuario não encontrado`})

            req.user = user
            next()            
            
        } catch (error) {
            return res.status(401).json({ message: `Token invalido`})
        }
    }
}