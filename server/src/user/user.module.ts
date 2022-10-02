import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import TransactionRepository from "../transaction/transaction.repository";
import JwtConfigService from "../server-config/jwt-config.service";
import ServerConfigModule from "../server-config/server-config.module";
import RoleRepository from "../authorization/role.repository";
import UserController from "./user.controller";
import UserService from "./user.service";
import UserRepository from "./user.repository";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRepository, TransactionRepository, RoleRepository]),
		JwtModule.registerAsync({ useExisting: JwtConfigService, imports: [ServerConfigModule] })
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserModule {}
