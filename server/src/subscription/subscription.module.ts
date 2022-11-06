import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import SubscriptionController from "./subscription.controller";
import SubscriptionService from "./subscription.service";
import SubscriptionRepository from "./subscription.repository";
import { Subscription } from "./subscription.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Subscription])],
	controllers: [SubscriptionController],
	providers: [SubscriptionService, SubscriptionRepository],
	exports: [SubscriptionService, SubscriptionRepository]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SubscriptionModule {}
