const AWS = require('aws-sdk')
const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = process.env
AWS.config.update({
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
})
const s3 = new AWS.S3()
const s3Service = {}


const params = {
    Bucket: '',
    Key: '',
    ACL: 'public-read'
}

s3Service.checkService = async () => {
    return new Promise(async (resolve, reject) => {
        s3.listBuckets((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

s3Service.getObject = async obj => {
    params.Key = `${obj.path}${obj.image}`
    params.ACL = 'public-read'
    return s3.listObjects(params).promise()
}

s3Service.saveObject = async (obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encodedDoc = obj.document
            const decodedDoc = Buffer.from(encodedDoc, 'base64')
            params.Body = decodedDoc
            params.Key = `${obj.path}${obj.name}`
            params.ACL = 'public-read'
            params.Bucket = obj.bucket
            console.log({ params })
            s3.upload(params).promise()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        } catch (e) {
            reject(e)
        }
    })

}

s3Service.deleteObject = (obj) => {
    params.Key = `${obj.path}${obj.name}`
    params.Bucket = obj.bucket
    delete params.Body
    delete params.ACL
    return s3.deleteObject(params).promise()
}

module.exports = s3Service
