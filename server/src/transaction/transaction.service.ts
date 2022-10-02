import { Injectable, Logger } from "@nestjs/common";
import SubscriptionRepository from "../subscription/subscription.repository";
import { User } from "../user/user.entity";
import TransactionRepository from "./transaction.repository";
import { Transaction } from "./transaction.entity";
import CreateTransactionDto from "./dto/requests/create-paypal-transaction.dto";

@Injectable()
export default class TransactionService {
	private static readonly logger = new Logger(TransactionService.name);

	public constructor(
		private readonly transactionRepository: TransactionRepository,
		private readonly subscriptionRepository: SubscriptionRepository
	) {}

	public async create(
		createTransactionDto: CreateTransactionDto,
		user: User
	): Promise<Transaction> {
		const transaction = {
			...this.transactionRepository.create({
				...createTransactionDto,
				subscriptions: await this.subscriptionRepository.findByIds(
					createTransactionDto.subscriptions
				)
			}),
			user
		};

		return this.transactionRepository.save(transaction);
	}
}
