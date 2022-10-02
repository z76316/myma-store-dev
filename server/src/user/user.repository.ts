import { Logger } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
	private static readonly logger = new Logger(UserRepository.name);
	// TODO: fking kill me user.admin
	private static readonly HAS_VALID_SUDBSCRIPTION_FOR_PRODUCT_QUERY = `
		SELECT user.admin, COUNT(1) as count FROM user
		LEFT JOIN transaction ON transaction.user_id = user.user_id
		LEFT JOIN transaction_subscriptions_subscription transaction_subscription
			ON transaction_subscription.transaction_id = transaction.transaction_id
		LEFT JOIN subscription subscription ON subscription.product_id = ?
		WHERE user.user_id = ?
			AND subscription.downloadable IS FALSE
			AND (
				(CURRENT_TIMESTAMP() BETWEEN transaction.created_at AND DATE_ADD(transaction.created_at, INTERVAL subscription.length DAY))
				OR user.admin IS TRUE
			)
	`;

	public async validUserSubscriptionForProduct(
		userId: number,
		productId: number
	): Promise<boolean> {
		const result = await this.query(UserRepository.HAS_VALID_SUDBSCRIPTION_FOR_PRODUCT_QUERY, [
			productId,
			userId
		]);

		return (
			(result[0].admin !== undefined && result[0].admin === 1) || parseInt(result[0].count, 10) > 0
		);
	}
}
