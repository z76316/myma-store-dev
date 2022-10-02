import { Type } from "class-transformer";
import { ApiResponseProperty } from "@nestjs/swagger";
import { Product } from "../../product.entity";

export default class ProductsDto {
	@ApiResponseProperty({ type: [Product] })
	@Type(() => Product)
	public readonly products: Product[];
}
