import Product from "./product";
import User from "./user";

export default interface Company {
	readonly id: number;
	readonly name: string;
	readonly products?: Product[];
	readonly employees?: User[];
	readonly createdAt: string;
}
