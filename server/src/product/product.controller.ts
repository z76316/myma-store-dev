import {
	Body,
	Controller,
	Post,
	Get,
	Delete,
	UseGuards,
	Param,
	NotFoundException
} from "@nestjs/common";
import {
	ApiTags,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiBearerAuth,
	ApiNotFoundResponse
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { plainToClass } from "class-transformer";
import Roles from "../authorization/decorators/role.decorator";
import RoleName from "../authorization/role-name";
import AuthenticationProvider from "../authentication/authentication.provider";
import RoleGuard from "../authorization/guards/role.guard";
import MYMAConfigService from "../server-config/myma-config.service";
import { Product } from "./product.entity";
import CreateProductDto from "./dto/requests/create-product.dto";
import ProductsDto from "./dto/responses/products.dto";
import ProductRepository from "./product.repository";

@ApiTags("products")
@Controller("api/products")
export default class ProductController {
	public constructor(
		private readonly productRepository: ProductRepository,
		private readonly mymaConfigService: MYMAConfigService
	) {}

	@Post()
	@ApiCreatedResponse({ type: Product, description: "Successfully created a product" })
	@ApiBadRequestResponse({ description: "Bad request" })
	@ApiBearerAuth()
	@Roles(RoleName.ADMIN)
	@UseGuards(AuthGuard(AuthenticationProvider.JWT), RoleGuard)
	public create(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return this.productRepository.save(this.productRepository.create(createProductDto));
	}

	@Get()
	@ApiOkResponse({ type: [ProductsDto], description: "Successfully retrieved" })
	public async getAllProducts(): Promise<ProductsDto> {
		const products = await this.productRepository.findAll();

		return plainToClass(ProductsDto, { products } as ProductsDto);
	}

	@Get(":codeName")
	@ApiOkResponse({ type: Product, description: "Successfully retrieved" })
	@ApiNotFoundResponse({ description: "No product with that code name exists" })
	public async getProduct(@Param("codeName") codeName: string): Promise<Product> {
		const product = await this.productRepository.findOne(
			{ codeName },
			{ relations: ["subscriptions", "company"] }
		);

		if (product === undefined) {
			throw new NotFoundException();
		}

		return plainToClass(Product, product);
	}

	@Delete(":id")
	@ApiOkResponse({ description: "Product deleted" })
	@ApiBearerAuth()
	@Roles(RoleName.ADMIN)
	@UseGuards(AuthGuard(AuthenticationProvider.JWT), RoleGuard)
	public async delete(@Param("id") id: number): Promise<void> {
		await this.productRepository.delete({ id });
	}
}
