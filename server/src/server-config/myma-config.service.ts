/* eslint-disable class-methods-use-this */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class MYMAConfigService {
	public constructor(private configService: ConfigService) {}

	public get nodeEnv(): "development" | "production" | "testing" {
		const nodeEnv = String(this.configService.get("NODE_ENV"));

		switch (nodeEnv) {
			case "development":
				return "development";
			case "production":
				return "production";
			case "testing":
				return "testing";
			default:
				throw new Error(`Unknown NODE_ENV: ${nodeEnv}`);
		}
	}

	public get mymaStoreDatabaseHost(): string {
		return String(this.configService.get("MYMA_STORE_DATABASE_HOST"));
	}

	public get mymaStoreDatabasePort(): number {
		return this.configService.get<number | undefined>("MYMA_STORE_DATABASE_PORT") ?? 3306;
	}

	public get mymaStoreDatabaseUsername(): string {
		return String(this.configService.get("MYMA_STORE_DATABASE_USERNAME"));
	}

	public get mymaStoreDatabasePassword(): string {
		return String(this.configService.get("MYMA_STORE_DATABASE_PASSWORD"));
	}

	public get mymaStoreDatabase(): string {
		return String(this.configService.get("MYMA_STORE_DATABASE"));
	}

	public get mymaStoreDomain(): string {
		return String(this.configService.get("MYMA_STORE_DOMAIN"));
	}

	public get mymaStoreServerPort(): number {
		return this.configService.get<number | undefined>("MYMA_STORE_SERVER_PORT") ?? 8080;
	}

	public get googleOAuthClientId(): string {
		return String(this.configService.get("GOOGLE_OAUTH_CLIENT_ID"));
	}

	public get googleOAuthClientSecret(): string {
		return String(this.configService.get("GOOGLE_OAUTH_CLIENT_SECRET"));
	}

	public get googleOAuthCallback(): string {
		return String(this.configService.get("GOOGLE_OAUTH_CALLBACK"));
	}

	public get mymaJwtSecret(): string {
		return String(this.configService.get("MYMA_JWT_SECRET"));
	}

	public get mailgunServer(): string | undefined {
		return this.configService.get("MAILGUN_SERVER");
	}

	public get mailgunPort(): number | undefined {
		return this.configService.get("MAILGUN_PORT");
	}

	public get mailgunUsername(): string | undefined {
		return this.configService.get("MAILGUN_USERNAME");
	}

	public get mailgunPassword(): string | undefined {
		return this.configService.get("MAILGUN_PASSWORD");
	}

	public get mymaEmailEnabled(): boolean {
		return this.configService.get("MYMA_EMAIL_ENABLED") ?? false;
	}

	public get mymaStaticSitePath(): string | undefined {
		return this.configService.get("MYMA_STATIC_SITE_PATH");
	}

	public get mymaProductsPath(): string {
		return String(this.configService.get("MYMA_PRODUCTS_PATH"));
	}

	public get mymaRootRoute(): string {
		return this.configService.get("MYMA_ROOT_ROUTE") ?? "/";
	}

	public get mymaContentRootRoute(): string {
		return this.configService.get("MYMA_CONTENT_ROOT_ROUTE") ?? "/content";
	}

	public get mymaActivateAccountRoute(): string {
		return this.configService.get("MYMA_ACTIVATE_ACCOUNT_ROUTE") ?? "/activate";
	}

	public get mymaResetPasswordRoute(): string {
		return this.configService.get("MYMA_RESET_PASSWORD_ROUTE") ?? "/reset-password";
	}

	public get mymaContactRoute(): string {
		return this.configService.get("MYMA_CONTACT_ROUTE") ?? "/contact";
	}

	public get diskThresholdPercentage(): number | undefined {
		return this.configService.get("DISK_THRESHOLD_PERCENTAGE");
	}

	public get memoryRssThreshold(): number | undefined {
		return this.configService.get("MEMORY_RSS_THRESHOLD");
	}

	public get memoryHeapThreshold(): number | undefined {
		return this.configService.get("MEMORY_HEAP_THRESHOLD");
	}
}
