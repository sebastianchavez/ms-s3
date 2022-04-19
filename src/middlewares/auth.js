const bcrypt = require('bcrypt-nodejs')

const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'No tienes autorizacion' })
    }

    const authorization = req.headers.authorization.split(' ')
    if (authorization[0] != 'Bearer') {
        return res.status(401).send({ message: 'No tienes autorizacion' })
    } else {
        const { SECRET_KEY } = process.env
        if (bcrypt.compareSync(authorization[1], SECRET_KEY)) {
            next()
        } else {
            return res.status(401).send({ message: 'No tienes autorizacion' })
        }
    }
}

module.exports = isAuth