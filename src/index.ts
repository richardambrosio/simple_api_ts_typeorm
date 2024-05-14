import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

import './connection'
import ProductController from './controllers/product.controller'

const PORT = process.env.PORT || 3000
const app = express()

app.get('/api/products', ProductController.findAll)

app.get('/', (request, response) => {
  response.send('Server up')
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
