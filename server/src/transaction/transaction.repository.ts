import { Logger } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import { Transaction } from "./transaction.entity";

@EntityRepository(Transaction)
export default class TransactionRepository extends Repository<Transaction> {
	private static readonly logger = new Logger(TransactionRepository.name);

	public async findByUserId(userId: number): Promise<Transaction[]> {
		const transactions = this.createQueryBuilder("transaction")
			.innerJoinAndSelect("transaction.subscriptions", "subscription")
			.innerJoin("transaction.user", "user", "user.id = :id", {
				id: userId
			})
			.getMany();

		return transactions;
	}
}
