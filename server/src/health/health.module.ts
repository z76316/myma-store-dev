import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TerminusModule } from "@nestjs/terminus";
import EmailModule from "../email/email.module";
import ServerConfigModule from "../server-config/server-config.module";
import HealthController from "./health.controller";
import HealthService from "./health.service";

@Module({
	controllers: [HealthController],
	imports: [TypeOrmModule.forRoot(), TerminusModule, EmailModule, ServerConfigModule],
	providers: [HealthService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class HealthModule {}
