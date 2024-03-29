const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { PORT } = process.env

app.set('port', PORT)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '500mb' }))


app.use('/api/images', require('./routers/image'))
app.use('/api/files', require('./routers/file'))
app.use('/v1/health', require('./routers/health'))


module.exports = app