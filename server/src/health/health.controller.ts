import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckResult } from "@nestjs/terminus";
import HealthService from "./health.service";

@Controller("api/health")
@ApiTags("health")
export default class HealthController {
	public constructor(private readonly healthService: HealthService) {}

	@Get()
	@HealthCheck()
	public check(): Promise<HealthCheckResult> {
		return this.healthService.healthy();
	}
}
