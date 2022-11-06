import { EntityManager, Repository } from "typeorm";
import { Logger, Injectable } from "@nestjs/common";
import { Subscription } from "./subscription.entity";

@Injectable()
export default class SubscriptionRepository extends Repository<Subscription> {
	private static readonly logger = new Logger(SubscriptionRepository.name);

	constructor(entityManager: EntityManager) {
		super(Subscription, entityManager);
	}
}
