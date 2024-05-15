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

  async update(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product)
    const { name, description, weight } = request.body

    const id: string = request.params.id
    let product

    try {
      product = await productRepository.findOneByOrFail({ id })
    } catch (error) {
      return response.status(404).send({
        error: 'Product not found'
      })
    }

    product.name = name
    product.description = description
    product.weight = weight

    try {
      const updated = await productRepository.save(product)

      return response.status(200).send({
        data: updated
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Error on save product'
      })
    }

  }

  async delete(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product)
    const id: string = request.params.id

    try {
      productRepository.delete(id)

      return response.status(204).send({})
    } catch (error) {
      return response.status(500).send({
        error: 'Error on delete product'
      })
    }
  }

}

export default new ProductController
