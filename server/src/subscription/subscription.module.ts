import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import SubscriptionController from "./subscription.controller";
import SubscriptionService from "./subscription.service";
import SubscriptionRepository from "./subscription.repository";

@Module({
	imports: [TypeOrmModule.forFeature([SubscriptionRepository])],
	controllers: [SubscriptionController],
	providers: [SubscriptionService],
	exports: [SubscriptionService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SubscriptionModule {}
