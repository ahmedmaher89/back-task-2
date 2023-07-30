const jwt = require('jsonwebtoken')

module.exports = (req , res , next) => {
    try {
        const fullToken = req.headers.authorization
        const token = fullToken?.split(' ')[1]
        if (!token) return res.status(403).send("Access Denied")
        let user = jwt.verify(token,'secuirtkey')
        req.user = user
        next()

    } catch (err){
        res.status(400).send('Invalid jwt')
    }
}