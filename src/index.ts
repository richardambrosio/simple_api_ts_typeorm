import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

import './connection'

const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (request, response) => {
  response.send('Server up')
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})