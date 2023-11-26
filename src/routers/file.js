const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const fileCtrl = require('../controllers/file.controller')
const isAuth = require('../middlewares/auth')

router.post('/update-file/:appId',
    isAuth,
    [
        check('file', 'Campo file es requerido').exists(),
        check('file', 'Campo file debe ser un campo base64').isBase64(),
        check('name', 'Campo name es requerido').exists(),
        check('name', 'Campo name debe ser un campo string').isString(),
        check('path', 'Campo path es requerido').exists(),
        check('path', 'Campo path debe ser un campo string').isString(),
    ],
    (req, res, next) => {
        const errors = validationResult(req)
        console.log({errors});
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
    fileCtrl.updateFile
)

module.exports = router