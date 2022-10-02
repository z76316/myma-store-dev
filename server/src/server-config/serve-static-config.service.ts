import fs from "fs";
import { Injectable, Logger } from "@nestjs/common";
import { ServeStaticModuleOptionsFactory, ServeStaticModuleOptions } from "@nestjs/serve-static";
import MYMAConfigService from "./myma-config.service";

@Injectable()
export default class ServeStaticConfigService implements ServeStaticModuleOptionsFactory {
	private static readonly logger = new Logger(ServeStaticConfigService.name);

	public constructor(private readonly mymaConfigService: MYMAConfigService) {}

	public createLoggerOptions(): ServeStaticModuleOptions[] {
		ServeStaticConfigService.logger.log("Creating ServeStatic options");

		const options: ServeStaticModuleOptions[] = [];

		if (!fs.existsSync(this.mymaConfigService.mymaProductsPath)) {
			ServeStaticConfigService.logger.log(
				`Mounting store content at ${this.mymaConfigService.mymaContentRootRoute}`
			);
			if (this.mymaConfigService.nodeEnv === "production") {
				ServeStaticConfigService.logger.error(
					`${this.mymaConfigService.mymaProductsPath} does not exist`
				);

				process.exit(1);
			} else {
				ServeStaticConfigService.logger.warn(
					`${this.mymaConfigService.mymaProductsPath} does not exist`
				);
			}

			options.push({
				rootPath: this.mymaConfigService.mymaProductsPath,
				exclude: ["/api/*"],
				serveRoot: this.mymaConfigService.mymaContentRootRoute
			});
		}

		if (this.mymaConfigService.mymaStaticSitePath) {
			ServeStaticConfigService.logger.log(
				`Mounting client at ${this.mymaConfigService.mymaStaticSitePath}`
			);
			if (!fs.existsSync(this.mymaConfigService.mymaStaticSitePath)) {
				if (this.mymaConfigService.nodeEnv === "production") {
					ServeStaticConfigService.logger.error(
						`${this.mymaConfigService.mymaStaticSitePath} does not exist`
					);

					process.exit(1);
				} else {
					ServeStaticConfigService.logger.warn(
						`${this.mymaConfigService.mymaStaticSitePath} does not exist`
					);
				}
			}

			options.push({
				rootPath: this.mymaConfigService.mymaStaticSitePath,
				exclude: ["/api/*", `${this.mymaConfigService.mymaContentRootRoute}/*`]
			});
		}

		return options;
	}
}
