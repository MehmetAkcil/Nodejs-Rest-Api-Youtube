import jwt from 'jsonwebtoken'

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    
    //token yok ise
    if(! token){
        return res.status(401).send({
            status: false,
            message: 'Token invalid'
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).send({
                status: false,
                message: 'Token invalid'
            })
        }

        req.user = decoded

        next()
    })

}


export default authToken