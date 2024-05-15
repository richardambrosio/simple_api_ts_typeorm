import { Request, Response} from 'express'
import { validate } from 'class-validator'
import { ProductRepository } from '@/repositories/product.repository'
import { CreateProductDTO, UpdateProductDTO } from '@/dtos/product.dto'

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

  findOne = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id
    const product = await this.productRepository.find(id)

    if (!product) {
      return response.status(404).send({
        error: 'Product not found'
      })
    }

    return response.status(200).send({
      data: product
    })
  }

  update = async (request: Request, response: Response): Promise<Response> => {
    const { name, description, weight } = request.body
    const id: string = request.params.id

    const dto = new UpdateProductDTO()
    dto.id = id
    dto.name = name
    dto.description = description
    dto.weight = weight

    const errors = await validate(dto)

    if (errors.length > 0) {
      return response.status(422).send({
        errors
      })
    }

    try {
      const updated = await this.productRepository.update(dto)
      if (!updated == null) {
        return response.status(404).send({
          error: 'Product not found'
        })
      }

      return response.status(200).send({
        data: updated
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Error on save product'
      })
    }

  }

  delete = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id

    try {
      this.productRepository.delete(id)

      return response.status(204).send({})
    } catch (error) {
      return response.status(500).send({
        error: 'Error on delete product'
      })
    }
  }

}

export default new ProductController
