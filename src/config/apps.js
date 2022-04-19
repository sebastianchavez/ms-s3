const { APP_ID_LANDING, S3_BUCKET_LANDING } = process.env

const LANDING_CATEGORIES = [
    { CATEGORY: 'IMAGE', PATH: '/images/' },
    { CATEGORY: 'VIDEO', PATH: '/videos/' },
]

module.exports = [
    {
        appId: APP_ID_LANDING,
        bucket: S3_BUCKET_LANDING,
        categories: LANDING_CATEGORIES
    }
]