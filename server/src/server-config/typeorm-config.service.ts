import { Logger } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import MYMAConfigService from "./myma-config.service";

export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
	private static readonly logger = new Logger(TypeOrmConfigService.name);

	public constructor(private readonly mymaConfigService: MYMAConfigService) {}

	createTypeOrmOptions(
		connectionName?: string | undefined
	): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
		if (connectionName)
			TypeOrmConfigService.logger.log(`Configuring the ${connectionName} data source`);
		return require("../../ormconfig");
	}
}
