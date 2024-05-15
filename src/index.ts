import 'module-alias/register'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import '@/database/connection'
import route from '@/routes'

const PORT = process.env.PORT || 3000
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(route)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
