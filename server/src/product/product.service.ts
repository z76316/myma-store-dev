import { Injectable, Logger } from "@nestjs/common";
import ProductRepository from "./product.repository";

@Injectable()
export default class ProductService {
	private static readonly logger = new Logger(ProductService.name);

	public constructor(private readonly productRepository: ProductRepository) {}
}
