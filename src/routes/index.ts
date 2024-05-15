import { Request, Response, Router } from 'express'
import ProductController from "@/controllers/product.controller"

const route = Router()

route.post('/api/products', ProductController.create)
route.get('/api/products', ProductController.findAll)
route.get('/api/products/:id', ProductController.findOne)
route.put('/api/products/:id', ProductController.update)
route.delete('/api/products/:id', ProductController.delete)

route.get('/', (_: Request, response: Response) => {
  response
    .status(200)
    .send({
    "success": true
  })
})

route.get("*", (_: Request, response: Response) => {
  response
    .status(404)
    .send({
    "error": "Not found"
  })
})

export default route
