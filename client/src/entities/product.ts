import Subscription from "./subscription";
import Company from "./company";
import User from "./user";

export default interface Product {
	readonly id: number;
	readonly title: string;
	readonly codeName: string;
	readonly tagLine: string;
	readonly startPage: string;
	readonly subscriptions?: Subscription[];
	readonly company: Company;
	readonly authors?: User[];
	readonly createdAt: string;
	readonly updatedAt: string;
}
