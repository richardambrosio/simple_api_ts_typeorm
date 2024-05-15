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
    const { name, description, weight } = request.body

    const product = new Product()
    product.name = name
    product.weight = weight
    product.description = description

    const created = await productRepository.save(product)

    return response.status(201).send({
      data: created
    })
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product)

    const id: string = request.params.id
    const product = await productRepository.findOneBy({ id })

    if (!product) {
      return response.status(404).send({
        error: 'Product not found'
      })
    }

    return response.status(200).send({
      data: product
    })
  }

}

export default new ProductController
