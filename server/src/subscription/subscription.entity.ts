import {
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	ManyToOne,
	JoinColumn,
	Table
} from "typeorm";
import { ApiResponseProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Product } from "../product/product.entity";
import { Transaction } from "../transaction/transaction.entity";

@Entity()
export class Subscription {
	@ApiResponseProperty({ example: 1 })
	@PrimaryGeneratedColumn({ name: "subscription_id" })
	public readonly id: number;

	@ApiResponseProperty({ example: 120 })
	@Column({ nullable: true })
	public readonly length?: number;

	@ApiResponseProperty({ example: 1876 })
	@Column()
	public readonly cost: number;

	@ApiResponseProperty({ example: false })
	@Column()
	public readonly downloadable: boolean;

	@ApiResponseProperty({ example: null })
	@Column({ name: "download_limit", nullable: true })
	public readonly downloadLimit?: number;

	@Exclude()
	@ManyToMany((type) => Transaction, (transaction) => transaction.subscriptions)
	public readonly transactions: Transaction[];

	@Exclude()
	@ManyToOne((type) => Product, (product) => product.subscriptions)
	@JoinColumn({ name: "product_id" })
	public readonly product: Product;

	@ApiResponseProperty({ type: String, example: new Date().toISOString() })
	@CreateDateColumn({ name: "created_at" })
	public readonly createdAt: Date;

	@Exclude()
	@UpdateDateColumn({ name: "updated_at" })
	public readonly updatedAt: Date;
}

const subscriptionTableDefinition = new Table({
	name: "subscription",
	columns: [
		{
			name: "subscription_id",
			type: "int",
			isGenerated: true,
			generationStrategy: "increment",
			isPrimary: true
		},
		{
			name: "length",
			type: "int",
			isNullable: true
		},
		{
			name: "cost",
			type: "int"
		},
		{
			name: "downloadable",
			type: "boolean"
		},
		{
			name: "download_limit",
			type: "int",
			isNullable: true
		},
		{
			name: "product_id",
			type: "int"
		},
		{
			name: "created_at",
			type: "datetime",
			default: "current_timestamp"
		},
		{
			name: "updated_at",
			type: "datetime",
			default: "current_timestamp"
		}
	],
	foreignKeys: [
		{
			columnNames: ["product_id"],
			referencedTableName: "product",
			referencedColumnNames: ["product_id"],
			onDelete: "CASCADE"
		}
	]
});

export { subscriptionTableDefinition };
