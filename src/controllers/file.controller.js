
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
const fileCtrl = {}

fileCtrl.updateFile = async (req, res) => {
    try {
        console.log('req:',req.body);
        console.log('params:',req.params);
        const { file, name, path } = req.body
        const { appId } = req.params
        const s3 = apps.find(x => x.appId.toLowerCase() == appId.toLowerCase())
        if (s3) {
            const obj = {
                document: file,
                path,
                name,
                bucket: process.env.S3_BUCKET
            }
            const response = await s3Service.saveObject(obj)
            console.log('Response:', response)
            res.status(200).send({ message: 'Archivo cargada con éxito', url: response.Location })
        } else {
            res.status(400).send({ message: 'App incorrecta' })
        }
    } catch (e) {
        logger.error(`Error updateFile - ${new Date().toISOString()} - ${e}`)
        console.error(e)
        res.status(500).send({ message: CONSTANTS.DEFAULT_ERROR })
    }
}

module.exports = fileCtrl