import AppDataSource from "@/database/connection";
import { CreateProductDTO, UpdateProductDTO } from "@/dtos/product.dto";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
  private repository: Repository<Product>

  constructor() {
    this.repository = AppDataSource.getRepository(Product)
  }

  async getAll(): Promise<Product[]> {
    return await this.repository.find()
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const product = new Product
    product.name = data.name
    product.description = data.description
    product.weight = data.weight

    return await this.repository.save(product)
  }

  async find(id: string): Promise<Product|null> {
    return await this.repository.findOneBy({ id })
  }

  async delete(id: string) {
    await this.repository.delete(id)
  }

  async update(data: UpdateProductDTO): Promise<Product|null> {
    const product = await this.find(data.id)

    if (!product) {
      return null
    }

    product.name = data.name
    product.description = data.description
    product.weight = data.weight

    return await this.repository.save(product)
  }
}
