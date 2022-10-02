import { Injectable, Logger } from "@nestjs/common";
import SubscriptionRepository from "./subscription.repository";

@Injectable()
export default class SubscriptionService {
	private static readonly logger = new Logger(SubscriptionService.name);

	public constructor(private readonly subscriptionRepository: SubscriptionRepository) {}
}
