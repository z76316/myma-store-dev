import Product from "./product";

export default interface Subscription {
	readonly id: number;
	readonly length: number;
	readonly cost: number;
	readonly downloadable: boolean;
	readonly product?: Product;
	readonly createdAt: string;
}
