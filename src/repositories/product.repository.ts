import AppDataSource from "@/database/connection";
import { CreateProductDTO } from "@/dtos/create.product.dto";
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
}
