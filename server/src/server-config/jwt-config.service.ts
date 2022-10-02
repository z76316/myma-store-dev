import { Injectable, Logger } from "@nestjs/common";
import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";
import MYMAConfigService from "./myma-config.service";

@Injectable()
export default class JwtConfigService implements JwtOptionsFactory {
	private static readonly logger = new Logger(JwtConfigService.name);

	public constructor(private readonly mymaConfigService: MYMAConfigService) {}

	public createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
		JwtConfigService.logger.log("Creating JWT options");

		return {
			secret: this.mymaConfigService.mymaJwtSecret,
			signOptions: {
				audience: [
					this.mymaConfigService.nodeEnv === "production"
						? "https://mymathapps.com"
						: "https://dev.mymathapps.com"
				]
			}
		};
	}
}
