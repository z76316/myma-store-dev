import { Injectable, Logger } from "@nestjs/common";
import {
	TypeOrmHealthIndicator,
	HealthIndicatorResult,
	MemoryHealthIndicator,
	DiskHealthIndicator,
	HealthCheckService,
	HealthIndicatorFunction,
	HealthCheckResult
} from "@nestjs/terminus";
import MYMAConfigService from "../server-config/myma-config.service";
import EmailService from "../email/email.service";

@Injectable()
export default class HealthService {
	private static readonly logger = new Logger(HealthService.name);
	private static readonly healthChecks: HealthIndicatorFunction[] = [];

	public constructor(
		private readonly health: HealthCheckService,
		private readonly typeOrm: TypeOrmHealthIndicator,
		private readonly emailService: EmailService,
		private readonly memory: MemoryHealthIndicator,
		private readonly disk: DiskHealthIndicator,
		private readonly mymaConfigService: MYMAConfigService
	) {}

	private dbCheck(): Promise<HealthIndicatorResult> {
		return this.typeOrm.pingCheck("db");
	}

	private async emailServiceCheck(): Promise<HealthIndicatorResult> {
		return {
			emailService: {
				status: (await this.emailService.healthy()) ? "up" : "down"
			}
		};
	}

	private diskCheck(): Promise<HealthIndicatorResult> | undefined {
		const diskThresholdPercentage = this.mymaConfigService.diskThresholdPercentage;

		if (diskThresholdPercentage) {
			HealthService.logger.log(`Configured disk threshold percentage: ${diskThresholdPercentage}`);

			return this.disk.checkStorage("diskStorage", {
				thresholdPercent: diskThresholdPercentage,
				path: "/"
			});
		}

		return undefined;
	}

	private memoryHeapCheck(): Promise<HealthIndicatorResult> | undefined {
		const memoryHeapThreshold = this.mymaConfigService.memoryHeapThreshold;

		if (memoryHeapThreshold) {
			HealthService.logger.log(`Configured memory heap threshold: ${memoryHeapThreshold}`);

			return this.memory.checkHeap("memoryHeap", memoryHeapThreshold);
		}

		return undefined;
	}

	private memoryRssCheck(): Promise<HealthIndicatorResult> | undefined {
		const memoryRssThreshold = this.mymaConfigService.memoryRssThreshold;

		if (memoryRssThreshold) {
			HealthService.logger.log(`Configured memory RSS threshold: ${memoryRssThreshold}`);

			return this.memory.checkRSS("memoryRss", memoryRssThreshold);
		}

		return undefined;
	}

	public healthy(): Promise<HealthCheckResult> {
		if (HealthService.healthChecks.length === 0) {
			HealthService.healthChecks.push(() => this.dbCheck());
			HealthService.healthChecks.push(() => this.emailServiceCheck());

			const diskCheck = this.diskCheck();
			const memoryHeapCheck = this.memoryHeapCheck();
			const memoryRssCheck = this.memoryRssCheck();

			if (diskCheck) {
				HealthService.healthChecks.push(() => diskCheck);
			}

			if (memoryHeapCheck) {
				HealthService.healthChecks.push(() => memoryHeapCheck);
			}

			if (memoryRssCheck) {
				HealthService.healthChecks.push(() => memoryRssCheck);
			}
		}

		return this.health.check(HealthService.healthChecks);
	}
}
