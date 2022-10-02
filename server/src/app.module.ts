import {
	Module,
	CacheModule,
	CacheInterceptor,
	ValidationPipe,
	ClassSerializerInterceptor,
	NestModule,
	MiddlewareConsumer
} from "@nestjs/common";
import Joi from "joi";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { NestEmitterModule } from "nest-emitter";
import { EventEmitter } from "typeorm/platform/PlatformTools";
import { ServeStaticModule } from "@nestjs/serve-static";
import ProductModule from "./product/product.module";
import TransactionModule from "./transaction/transaction.module";
import SubscriptionModule from "./subscription/subscription.module";
import UserModule from "./user/user.module";
import CompanyModule from "./company/company.module";
import ServerConfigModule from "./server-config/server-config.module";
import AuthenticationModule from "./authentication/authentication.module";
import AuthorizationModule from "./authorization/authorization.module";
import LoggerMiddleware from "./meta/middleware/logger.middleware";
import MYMAConfigService from "./server-config/myma-config.service";
import ServeStaticConfigService from "./server-config/serve-static-config.service";
import AllExceptionFilter from "./meta/filters/all-exception.filter";
import HealthModule from "./health/health.module";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			//eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
			useFactory: () => require("../ormconfig")
		}),
		ConfigModule.forRoot({
			envFilePath: [
				`${process.env.NODE_ENV}.env`,
				`${process.env.NODE_ENV}.local.env`,
				`.${process.env.NODE_ENV}.env`,
				`.${process.env.NODE_ENV}.local.env`
			],
			ignoreEnvFile: process.env.NODE_ENV === "production",
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().valid("development", "production", "testing").default("development"),
				MYMA_STORE_DATABASE_HOST: Joi.string()
					.hostname()
					.default("localhost")
					.description("Host the database listens on"),
				MYMA_STORE_DATABASE_PORT: Joi.number()
					.default(3306)
					.description("Port the database listens on"),
				MYMA_STORE_DATABASE_USERNAME: Joi.string()
					.default("root")
					.description("Username for the database user"),
				MYMA_STORE_DATABASE_PASSWORD: Joi.string()
					.default("yasskin")
					.description("Password for the database user"),
				MYMA_STORE_DATABASE: Joi.string()
					.default("MYMAStore")
					.description("Name of the database to use"),
				GOOGLE_OAUTH_CLIENT_ID: Joi.string().required().description("Google OAuth Client ID"),
				GOOGLE_OAUTH_CLIENT_SECRET: Joi.string()
					.required()
					.description("Google OAuth Client Secret"),
				GOOGLE_OAUTH_CALLBACK: Joi.string()
					.required()
					.description("Where Google should redirect to after login"),
				MYMA_JWT_SECRET: Joi.string()
					.required()
					.description("The JWT secret to sign all tokens with"),
				DISK_THRESHOLD_PERCENTAGE: Joi.number().description("Disk usage percentage to warn at"),
				MEMORY_HEAP_THRESHOLD: Joi.number().description("Heap usage percentage to warn at"),
				MEMORY_RSS_THRESHOLD: Joi.number().description(
					"Resident set size usage percentage to warn at"
				),
				MYMA_STORE_DOMAIN: Joi.string()
					.default("localhost")
					.description(
						"Domain of the website Needed in order to share user JWT for subscription validation and OAuth2 redirect"
					),
				MYMA_STORE_SERVER_PORT: Joi.number()
					.default(8080)
					.description("The port on which the run the Store from"),
				MYMA_STATIC_SITE_PATH: Joi.string().description("Where the static files to serve are"),
				MYMA_PRODUCTS_PATH: Joi.string().required().description("Where the textbook bulid is at"),
				MYMA_CONTENT_ROOT_ROUTE: Joi.string()
					.default("/content")
					.description("The root route where all static content exists"),
				MYMA_EMAIL_ENABLED: Joi.boolean().default(false).description("Whether to send emails"),
				MAILGUN_SERVER: Joi.string().description("The mailgun smtp server"),
				MAILGUN_PORT: Joi.number().description("The mailgun smtp port"),
				MAILGUN_USERNAME: Joi.string().description("The mailgun account username"),
				MAILGUN_PASSWORD: Joi.string().description("The mailgun account password")
			})
		}),
		CacheModule.register(),
		NestEmitterModule.forRoot(new EventEmitter()),
		ServeStaticModule.forRootAsync({
			imports: [ServerConfigModule],
			useClass: ServeStaticConfigService
		}),
		ServerConfigModule,
		HealthModule,
		AuthenticationModule,
		AuthorizationModule,
		ProductModule,
		TransactionModule,
		SubscriptionModule,
		UserModule,
		CompanyModule
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor
		}
		// {
		// 	provide: APP_FILTER,
		// 	useClass: AllExceptionFilter
		// }
	]
})
export default class ApplicationModule implements NestModule {
	public constructor(private readonly mymaConfigService: MYMAConfigService) {}

	public configure(consumer: MiddlewareConsumer): void {
		if (this.mymaConfigService.nodeEnv === "development") {
			consumer.apply(LoggerMiddleware).forRoutes("*");
		}
	}
}
