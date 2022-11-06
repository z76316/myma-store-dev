import { DataSource, EntityManager, Repository } from "typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { Product } from "./product.entity";

@Injectable()
export default class ProductRepository extends Repository<Product> {
	private static readonly logger = new Logger(ProductRepository.name);

	constructor(entityManager: EntityManager) {
		super(Product, entityManager);
	}

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
