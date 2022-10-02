import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany,
	ManyToOne,
	JoinColumn,
	Table
} from "typeorm";
import { ApiResponseProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Subscription } from "../subscription/subscription.entity";
import { Company } from "../company/company.entity";
import { User } from "../user/user.entity";

@Entity()
export class Product {
	@ApiResponseProperty({ example: 1 })
	@PrimaryGeneratedColumn({ name: "product_id" })
	public readonly id: number;

	@ApiResponseProperty({ example: "Calculus 1" })
	@Column({ type: "text" })
	public readonly title: string;

	@ApiResponseProperty({ example: "Calculus is easy as Pi" })
	@Column({ name: "tag_line", nullable: true })
	public readonly tagLine?: string;

	@ApiResponseProperty({ example: "MContents.html" })
	@Column({ name: "start_page", nullable: true })
	public readonly startPage?: string;

	@ApiResponseProperty({ type: Subscription })
	@OneToMany((type) => Subscription, (subscription) => subscription.product)
	@Type(() => Subscription)
	public readonly subscriptions: Subscription[];

	@ApiResponseProperty({ example: "MYMACalc1" })
	@Column({ type: "varchar", length: 127, unique: true, name: "code_name" })
	public readonly codeName: string;

	@ApiResponseProperty({ type: Company })
	@ManyToOne((type) => Company, (company) => company.products)
	@JoinColumn({ name: "company_id" })
	@Type(() => Company)
	public readonly company: Company;

	@ApiResponseProperty({ type: User })
	@ManyToMany((type) => User, (user) => user.products)
	@Type(() => User)
	public readonly authors: User[];

	@ApiResponseProperty({ type: String, example: new Date().toISOString() })
	@CreateDateColumn({ name: "created_at" })
	public readonly createdAt: Date;

	@ApiResponseProperty({ type: String, example: new Date().toISOString() })
	@UpdateDateColumn({ name: "updated_at" })
	public readonly updatedAt: Date;
}

const productTableDefinition = new Table({
	name: "product",
	columns: [
		{
			name: "product_id",
			type: "int",
			isGenerated: true,
			generationStrategy: "increment",
			isPrimary: true,
			isNullable: false
		},
		{
			name: "title",
			type: "varchar",
			length: "127",
			isNullable: false
		},
		{
			name: "tag_line",
			type: "varchar",
			length: "127"
		},
		{
			name: "start_page",
			type: "varchar",
			length: "127",
			isNullable: true
		},
		{
			name: "code_name",
			type: "varchar",
			length: "127",
			isUnique: true,
			isNullable: false
		},
		{
			name: "company_id",
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
			columnNames: ["company_id"],
			referencedTableName: "company",
			referencedColumnNames: ["company_id"],
			onDelete: "CASCADE"
		}
	]
});

export { productTableDefinition };
