module.exports = (req, res ,next) => {
    if(error){
        if(error instanceof HttpsError){
            res.status(error.status).json({message: error.message})
        } else {

        }
        res.status(400).json({message: error.message})
    } else {
        next()
    }
}