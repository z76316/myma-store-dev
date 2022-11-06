import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import JwtConfigService from "../server-config/jwt-config.service";
import ServerConfigModule from "../server-config/server-config.module";
import UserController from "./user.controller";
import UserService from "./user.service";
import { Role } from "../authorization/role.entity";
import { Transaction } from "../transaction/transaction.entity";
import { User } from "./user.entity";
import UserRepository from "./user.repository";
import AuthorizationModule from "../authorization/authorization.module";
import TransactionModule from "../transaction/transaction.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Transaction, Role]),
		JwtModule.registerAsync({ useExisting: JwtConfigService, imports: [ServerConfigModule] }),
		AuthorizationModule,
		TransactionModule
	],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserModule {}
