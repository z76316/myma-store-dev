import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import JwtConfigService from "./jwt-config.service";
import MYMAConfigService from "./myma-config.service";

@Module({
	imports: [ConfigModule],
	providers: [MYMAConfigService, JwtConfigService],
	exports: [MYMAConfigService, JwtConfigService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ServerConfigModule {}
