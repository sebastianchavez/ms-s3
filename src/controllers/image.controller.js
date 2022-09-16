const s3Service = require('../services/s3.service')
const apps = require('../config/apps')
const winston = require('winston')
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: { service: 's3-service' },
    transports: [
        new winston.transports.File({ filename: 'error-s3-service.log', level: 'error' }),
    ],
})
const CONSTANTS = require('../config/constants')
const imageCtrl = {}

imageCtrl.saveImage = async (req, res) => {
    try {
        const { nameImage, image, path } = req.body
        const { appId, category } = req.params
        const s3 = apps.find(x => x.appId.toLowerCase() == appId.toLowerCase())
        if (s3) {
            const selectedCategory = s3.categories.find(c => c.CATEGORY.toLowerCase() == category.toLowerCase())
            if (selectedCategory) {
                const obj = {
                    document: image,
                    path: path && path != '' ? path : s3.appId.toLowerCase() + selectedCategory.PATH,
                    name: nameImage,
                    bucket: s3.bucket
                }
                const response = await s3Service.saveObject(obj)
                res.status(200).send({ message: 'Imagen cargada con éxito', url: response.Location })
            } else {
                res.status(400).send({ message: 'Categoría incorrecta' })
            }
        } else {
            res.status(400).send({ message: 'App incorrecta' })
        }
    } catch (e) {
        logger.error(`Error saveImage - ${new Date().toISOString()} - ${e}`)
        console.error(e)
        res.status(500).send({ message: CONSTANTS.DEFAULT_ERROR })
    }
}

imageCtrl.deleteImage = async (req, res) => {
    try {
        const { nameImage, path } = req.body
        const { appId } = req.params
        const s3 = apps.find(x => x.appId.toLowerCase() == appId.toLowerCase())
        if (s3) {
            const obj = {
                path,
                name: nameImage,
                bucket: s3.bucket
            }
            const response = await s3Service.deleteObject(obj)
            res.status(200).send({ message: 'Imagen eliminada con éxito' })
        } else {
            res.status(400).send({ message: 'App incorrecta' })
        }
    } catch (error) {
        logger.error(`Error deleteImage - ${new Date().toISOString()} - ${e}`)
        console.error('Error deleteImage: ', e)
        res.status(500).send({ message: CONSTANTS.DEFAULT_ERROR })
    }
}

module.exports = imageCtrl