import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	CreateDateColumn,
	UpdateDateColumn,
	Table
} from "typeorm";
import { ApiResponseProperty } from "@nestjs/swagger";
import { Type, Exclude } from "class-transformer";
import { User } from "../user/user.entity";
import RoleName from "./role-name";
import { Permission } from "./permission.entity";

@Entity()
class Role {
	@PrimaryGeneratedColumn({ name: "role_id" })
	public readonly id: number;

	@ApiResponseProperty({ enum: RoleName, example: RoleName.USER })
	@Column({ type: "enum", enum: RoleName })
	public readonly name: RoleName;

	@Exclude()
	@ManyToMany((type) => User, (user) => user.roles)
	public readonly users: User[];

	@ApiResponseProperty({ type: [Permission] })
	@ManyToMany((type) => Permission, (permission) => permission.roles)
	@JoinTable({
		name: "role_permissions",
		joinColumn: { name: "role_id" },
		inverseJoinColumn: { name: "permission_id" }
	})
	@Type(() => Permission)
	public readonly permissions: Permission[];

	@ApiResponseProperty({ type: String, example: new Date().toISOString() })
	@CreateDateColumn({ name: "created_at" })
	public readonly createdAt: Date;

	@ApiResponseProperty({ type: String, example: new Date().toISOString() })
	@UpdateDateColumn({ name: "updated_at" })
	public readonly updatedAt: Date;
}

const roleTableDefinition = new Table({
	name: "role",
	columns: [
		{
			name: "role_id",
			type: "int",
			isGenerated: true,
			generationStrategy: "increment",
			isPrimary: true
		},
		{
			name: "name",
			type: "enum",
			enum: [RoleName.ADMIN, RoleName.USER],
			isUnique: true
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

const rolePermissionsTableDefinition = new Table({
	name: "role_permissions",
	columns: [
		{
			name: "role_id",
			type: "int",
			isPrimary: true
		},
		{
			name: "permission_id",
			type: "int",
			isPrimary: true
		}
	],
	foreignKeys: [
		{
			columnNames: ["role_id"],
			referencedTableName: "role",
			referencedColumnNames: ["role_id"],
			onDelete: "CASCADE"
		},
		{
			columnNames: ["permission_id"],
			referencedTableName: "permission",
			referencedColumnNames: ["permission_id"],
			onDelete: "CASCADE"
		}
	]
});

export { Role, roleTableDefinition, rolePermissionsTableDefinition };
