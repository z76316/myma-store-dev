import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import ServerConfigModule from "../server-config/server-config.module";
import JwtConfigService from "../server-config/jwt-config.service";
import ProductController from "./product.controller";
import ProductService from "./product.service";
import ProductRepository from "./product.repository";
import { Product } from "./product.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Product]),
		JwtModule.registerAsync({ useExisting: JwtConfigService, imports: [ServerConfigModule] })
	],
	controllers: [ProductController],
	providers: [ProductService, ProductRepository],
	exports: [ProductService, ProductRepository]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ProductModule {}
