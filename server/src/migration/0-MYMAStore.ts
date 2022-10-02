import { MigrationInterface, QueryRunner } from "typeorm";
import { Logger } from "@nestjs/common";
import { permissionTableDefinition } from "../authorization/permission.entity";
import { roleTableDefinition, rolePermissionsTableDefinition } from "../authorization/role.entity";
import {
	userTableDefinition,
	authorTableDefinition,
	userRolesTableDefinition
} from "../user/user.entity";
import { companyTableDefinition, employeeTableDefinition } from "../company/company.entity";
import { productTableDefinition } from "../product/product.entity";
import { subscriptionTableDefinition } from "../subscription/subscription.entity";
import {
	transactionTableDefinition,
	lineItemsTableDefinition
} from "../transaction/transaction.entity";

export default class MYMAStore1585353005379 implements MigrationInterface {
	private static readonly logger = new Logger(MYMAStore1585353005379.name);

	// eslint-disable-next-line class-methods-use-this
	public async up(queryRunner: QueryRunner): Promise<void> {
		MYMAStore1585353005379.logger.log("Up");

		await queryRunner.createTable(permissionTableDefinition, true);
		await queryRunner.createTable(roleTableDefinition, true);
		await queryRunner.createTable(userTableDefinition, true);
		await queryRunner.createTable(companyTableDefinition, true);
		await queryRunner.createTable(productTableDefinition, true);
		await queryRunner.createTable(subscriptionTableDefinition, true);
		await queryRunner.createTable(transactionTableDefinition, true);
		await queryRunner.createTable(rolePermissionsTableDefinition, true);
		await queryRunner.createTable(userRolesTableDefinition, true);
		await queryRunner.createTable(authorTableDefinition, true);
		await queryRunner.createTable(employeeTableDefinition, true);
		await queryRunner.createTable(lineItemsTableDefinition, true);
	}

	// eslint-disable-next-line class-methods-use-this
	public async down(queryRunner: QueryRunner): Promise<void> {
		MYMAStore1585353005379.logger.log("Down");

		const tables = await queryRunner.getTables([]);
		Promise.all(tables.map((t) => queryRunner.dropTable(t, true, true, true)));
	}
}
