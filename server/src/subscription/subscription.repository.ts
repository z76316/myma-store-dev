import { Repository, EntityRepository } from "typeorm";
import { Logger } from "@nestjs/common";
import { Subscription } from "./subscription.entity";

@EntityRepository(Subscription)
export default class SubscriptionRepository extends Repository<Subscription> {
	private static readonly logger = new Logger(SubscriptionRepository.name);
}
