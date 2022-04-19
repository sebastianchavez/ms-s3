const s3Service = require('../services/s3.service')
const healthCtrl = {}

healthCtrl.health = async (req, res) => {
    try {
        await s3Service.checkService()
        res.status(200).send({ message: 'Servicio disponible' })
    } catch (e) {
        console.error(e)
        res.status(500).send({ message: 'Problemas en el servicio', error: e })
    }
}

module.exports = healthCtrl