const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const imageCtrl = require('../controllers/image.controller')
const isAuth = require('../middlewares/auth')

router.post('/update-image/:appId/:category',
    isAuth,
    [
        check('nameImage', 'Campo nameImage es requerido').exists(),
        check('nameImage', 'Campo nameImage debe ser un campo string').isString(),
        check('image', 'Campo image es requerido').exists(),
        check('appId', 'Campo appId debe ser un campo string').isString(),
        check('category', 'Campo category debe ser un campo string').isString(),
        check('path', 'Campo opcional').optional(),
        check('path', 'Campo path debe ser un campo string').isString(),
    ],
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
    imageCtrl.saveImage
)

router.post('/delete-image/:appId/',
    isAuth,
    [
        check('nameImage', 'Campo nameImage es requerido').exists(),
        check('nameImage', 'Campo nameImage debe ser un campo string').isString(),
        check('appId', 'Campo appId debe ser un campo string').isString(),
        check('path', 'Campo path es requerido').exists(),
        check('path', 'Campo path debe ser un campo string').isString(),
    ],
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }, imageCtrl.deleteImage
)

module.exports = router