import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import ServerConfigModule from "../server-config/server-config.module";
import UserRepository from "../user/user.repository";
import ProductRepository from "../product/product.repository";
import JwtConfigService from "../server-config/jwt-config.service";
import RoleRepository from "../authorization/role.repository";
import UserModule from "../user/user.module";
import EmailModule from "../email/email.module";
import GoogleStrategy from "./strategies/google.strategy";
import JwtStrategy from "./strategies/jwt.strategy";
import AuthenticationService from "./authentication.service";
import LocalStrategy from "./strategies/local.strategy";
import AuthenticationController from "./authentication.controller";

@Module({
	imports: [
		ServerConfigModule,
		TypeOrmModule.forFeature([UserRepository, ProductRepository, RoleRepository]),
		PassportModule.register({ session: false }),
		JwtModule.registerAsync({
			imports: [ServerConfigModule],
			useExisting: JwtConfigService
		}),
		UserModule,
		EmailModule
	],
	controllers: [AuthenticationController],
	providers: [GoogleStrategy, JwtStrategy, LocalStrategy, AuthenticationService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class AuthenticationModule {}
