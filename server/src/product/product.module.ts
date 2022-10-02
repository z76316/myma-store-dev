import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import UserRepository from "../user/user.repository";
import ServerConfigModule from "../server-config/server-config.module";
import JwtConfigService from "../server-config/jwt-config.service";
import ProductController from "./product.controller";
import ProductService from "./product.service";
import ProductRepository from "./product.repository";

@Module({
	imports: [
		TypeOrmModule.forFeature([ProductRepository, UserRepository]),
		JwtModule.registerAsync({ useExisting: JwtConfigService, imports: [ServerConfigModule] }),
		ServerConfigModule
	],
	controllers: [ProductController],
	providers: [ProductService],
	exports: [ProductService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ProductModule {}
