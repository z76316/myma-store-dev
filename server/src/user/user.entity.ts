import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
	Table
} from "typeorm";
import { IsEmail } from "class-validator";
import { Exclude, Type } from "class-transformer";
import { ApiResponseProperty } from "@nestjs/swagger";
import { Transaction } from "../transaction/transaction.entity";
import { Company } from "../company/company.entity";
import { Product } from "../product/product.entity";
import { Role } from "../authorization/role.entity";

@Entity()
export class User {
	@ApiResponseProperty({ example: 1 })
	@PrimaryGeneratedColumn({ name: "user_id" })
	public readonly id: number;

	@ApiResponseProperty({ example: "Jane Doe" })
	@Column()
	public readonly name: string;

	@ApiResponseProperty({ example: "jane.doe@example.com" })
	@Column({ unique: true })
	@IsEmail()
	public readonly email: string;

	@Exclude()
	@Column({ name: "google_access_token", nullable: true })
	public googleAccessToken?: string;

	@Exclude()
	@Column({ nullable: true, name: "hashed_password" })
	public hashedPassword?: string;

	@Exclude()
	@Column({ default: false, name: "requested_temporary_password" })
	public requestedTemporaryPassword?: boolean;

	@Exclude()
	@Column({ nullable: true, name: "temporary_password", length: 16 })
	public temporaryPassword?: string;

	@Exclude()
	@Column({ nullable: true, name: "temporary_password_requested_at" })
	public temporaryPasswordRequestedAt?: Date;

	@Exclude()
	@Column({ default: false, name: "activated_account" })
	public activatedAccount: boolean;

	@Exclude()
	@Column({ nullable: true, name: "activation_code", length: 32 })
	public activationCode?: string;

	@ApiResponseProperty({ type: [Role] })
	@ManyToMany((type) => Role, (role) => role.users)
	@JoinTable({
		name: "user_roles",
		joinColumn: { name: "user_id" },
		inverseJoinColumn: { name: "role_id" }
	})
	@Type(() => Role)
	public roles: Role[];

	@Exclude()
	@OneToMany((type) => Transaction, (transaction) => transaction.user)
	@Type(() => Transaction)
	public readonly transactions: Transaction[];

	@ApiResponseProperty({ type: [Company] })
	@ManyToMany((type) => Company, (company) => company.employees)
	@Type(() => Company)
	public readonly companies: Company[];

	@ApiResponseProperty({ type: [Product] })
	@ManyToMany((type) => Product, (product) => product.authors)
	@Type(() => Product)
	@JoinTable({
		name: "author",
		joinColumn: { name: "user_id" },
		inverseJoinColumn: { name: "product_id" }
	})
	public readonly products: Product[];

	@ApiResponseProperty({ type: String, example: new Date().toISOString() })
	@CreateDateColumn({ name: "created_at" })
	public readonly createdAt: Date;

	@ApiResponseProperty({ type: String, example: new Date().toISOString() })
	@UpdateDateColumn({ name: "updated_at" })
	public readonly updatedAt: Date;
}

const userTableDefinition = new Table({
	name: "user",
	columns: [
		{
			name: "user_id",
			type: "int",
			isGenerated: true,
			generationStrategy: "increment",
			isPrimary: true
		},
		{
			name: "name",
			type: "varchar",
			length: "127"
		},
		{
			name: "email",
			type: "varchar",
			length: "127",
			isUnique: true
		},
		{
			name: "google_access_token",
			type: "varchar",
			length: "127",
			isNullable: true,
			isUnique: true
		},
		{
			name: "hashed_password",
			type: "varchar",
			length: "127",
			isNullable: true
		},
		{
			name: "requested_temporary_password",
			type: "boolean",
			default: false
		},
		{
			name: "temporary_password",
			type: "varchar",
			length: "16",
			isNullable: true
		},
		{
			name: "temporary_password_requested_at",
			type: "datetime",
			isNullable: true
		},
		{
			name: "activated_account",
			type: "boolean",
			default: false
		},
		{
			name: "activation_code",
			type: "varchar",
			length: "32",
			isNullable: true
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
	]
});

const userRolesTableDefinition = new Table({
	name: "user_roles",
	columns: [
		{
			name: "user_id",
			type: "int",
			isPrimary: true
		},
		{
			name: "role_id",
			type: "int",
			isPrimary: true
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
			columnNames: ["user_id"],
			referencedTableName: "user",
			referencedColumnNames: ["user_id"],
			onDelete: "CASCADE"
		},
		{
			columnNames: ["role_id"],
			referencedTableName: "role",
			referencedColumnNames: ["role_id"],
			onDelete: "CASCADE"
		}
	]
});

const authorTableDefinition = new Table({
	name: "author",
	columns: [
		{
			name: "user_id",
			type: "int",
			isPrimary: true
		},
		{
			name: "product_id",
			type: "int",
			isPrimary: true
		}
	],
	foreignKeys: [
		{
			columnNames: ["user_id"],
			referencedTableName: "user",
			referencedColumnNames: ["user_id"],
			onDelete: "CASCADE"
		},
		{
			columnNames: ["product_id"],
			referencedTableName: "product",
			referencedColumnNames: ["product_id"],
			onDelete: "CASCADE"
		}
	]
});

export { userTableDefinition, userRolesTableDefinition, authorTableDefinition };
