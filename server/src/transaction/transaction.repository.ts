import { Logger, Injectable } from "@nestjs/common";
import { Repository, EntityManager } from "typeorm";
import { Transaction } from "./transaction.entity";

@Injectable()
export default class TransactionRepository extends Repository<Transaction> {
	private static readonly logger = new Logger(TransactionRepository.name);

	constructor(entityManager: EntityManager) {
		super(Transaction, entityManager);
	}

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
