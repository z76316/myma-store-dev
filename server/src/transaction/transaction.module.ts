import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import SubscriptionRepository from "../subscription/subscription.repository";
import TransactionController from "./transaction.controller";
import TransactionService from "./transaction.service";
import TransactionRepository from "./transaction.repository";

@Module({
	imports: [
		TypeOrmModule.forFeature([TransactionRepository, SubscriptionRepository]),
		ConfigModule
	],
	controllers: [TransactionController],
	providers: [TransactionService],
	exports: [TransactionService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class TransactionModule {}
