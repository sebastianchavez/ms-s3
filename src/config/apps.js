const LANDING_CATEGORIES = [
    { CATEGORY: 'IMAGE', PATH: '/images/' },
    { CATEGORY: 'VIDEO', PATH: '/videos/' },
]

const PORTFOLIO_CATEGORIES = [
    { CATEGORY: 'IMAGE', PATH: '/images/' },
]

const ITALK_CATEGORIES = [
    { CATEGORY: 'IMAGE', PATH: '/images/' },
    { CATEGORY: 'VIDEO', PATH: '/videos/' },
]

module.exports = [
    {
        appId: process.env.APP_ID_LANDING,
        bucket: process.env.S3_BUCKET_LANDING,
        categories: LANDING_CATEGORIES
    },
    {
        appId: process.env.APP_ID_PORTFOLIO,
        bucket: process.env.S3_PORTFOLIO,
        categories: PORTFOLIO_CATEGORIES
    },
    {
        appId: process.env.APP_ID_ITALK,
        bucket: process.env.S3_ITALK,
        categories: ITALK_CATEGORIES
    },
    {
        appId: process.env.APP_ID_PANDEMICRO,
        bucket: process.env.S3_PANDEMICRO,
        categories: []
    }
]