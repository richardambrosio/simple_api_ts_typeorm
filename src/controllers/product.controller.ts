import { Request, Response} from 'express'
import AppDataSource from '../connection'
import { Product } from '../entities/product.entity'

class ProductController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product)

    const products = await productRepository.find()

    return response.status(200).send({
      data: products
    })

  }

  async create(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product)

    const product = new Product()
    product.name = 'Product 1'
    product.weight = 90
    product.description = 'A simple product'

    const created = await productRepository.save(product)

    return response.status(201).send({
      data: created
    })
  }

}

export default new ProductController
