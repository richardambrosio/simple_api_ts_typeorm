import 'module-alias/register'
import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

import '@/connection'
import ProductController from '@/controllers/product.controller'
import cors from 'cors'

const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/api/products', ProductController.create)
app.get('/api/products', ProductController.findAll)
app.get('/api/products/:id', ProductController.findOne)
app.put('/api/products/:id', ProductController.update)
app.delete('/api/products/:id', ProductController.delete)

app.get('/', (request, response) => {
  response.send('Server up')
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
