import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import TransactionController from "./transaction.controller";
import TransactionService from "./transaction.service";
import TransactionRepository from "./transaction.repository";
import { Subscription } from "../subscription/subscription.entity";
import { Transaction } from "./transaction.entity";
import SubscriptionModule from "../subscription/subscription.module";

@Module({
	imports: [TypeOrmModule.forFeature([Transaction, Subscription]), SubscriptionModule],
	controllers: [TransactionController],
	providers: [TransactionService, TransactionRepository],
	exports: [TransactionService, TransactionRepository]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class TransactionModule {}
