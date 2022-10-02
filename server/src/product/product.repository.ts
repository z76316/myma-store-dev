import { Repository, EntityRepository } from "typeorm";
import { Logger } from "@nestjs/common";
import { Product } from "./product.entity";

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
	private static readonly logger = new Logger(ProductRepository.name);

	public async findAll(): Promise<Product[]> {
		return this.createQueryBuilder("product")
			.select()
			.innerJoinAndSelect("product.subscriptions", "subscription")
			.innerJoinAndSelect("product.company", "company")
			.orderBy("product.title", "ASC")
			.addOrderBy("company.name", "ASC")
			.getMany();
	}
}
