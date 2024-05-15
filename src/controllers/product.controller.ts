import { Request, Response} from 'express'
import AppDataSource from '@/database/connection'
import { Product } from '@/entities/product.entity'
import { validate } from 'class-validator'
import { ProductRepository } from '@/repositories/product.repository'
import { CreateProductDTO } from '@/dtos/create.product.dto'

class ProductController {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository
  }

  findAll = async (_: Request, response: Response): Promise<Response> => {
    const products = await this.productRepository.getAll()

    return response.status(200).send({
      data: products
    })

  }

  create = async (request: Request, response: Response): Promise<Response> => {
    const { name, description, weight } = request.body
    const dto = new CreateProductDTO

    dto.name = name
    dto.description = description
    dto.weight = weight

    const errors = await validate(dto)
    if (errors.length > 0) {
      return response.status(422).send({
        errors
      })
    }

    const created = await this.productRepository.create(dto)

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

    const errors = await validate(product)

    if (errors.length > 0) {
      return response.status(422).send({
        errors: errors
      })
    }

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
