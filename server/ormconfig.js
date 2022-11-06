/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */

const path = require("path");

module.exports = {
	type: "mariadb",
	host: process.env.MYMA_STORE_DATABASE_HOST,
	port: process.env.MYMA_STORE_DATABASE_PORT,
	database: process.env.MYMA_STORE_DATABASE,
	username: process.env.MYMA_STORE_DATABASE_USERNAME,
	password: process.env.MYMA_STORE_DATABASE_PASSWORD,
	synchronize: process.env.NODE_ENV !== "production",
	entities: [
		path.join(
			__dirname,
			process.env.NODE_ENV !== "production" ? "src" : "dist",
			"**",
			"*.entity{.ts,.js}"
		)
	],
	subscribers: [
		path.join(
			__dirname,
			process.env.NODE_ENV !== "production" ? "src" : "dist",
			"**",
			"*.subscriber{.ts,.js}"
		)
	],
	migrationsRun: true,
	migrationsTableName: "migration",
	migrations: [
		path.join(
			__dirname,
			process.env.NODE_ENV !== "production" ? "src" : "dist",
			"migration",
			"*{.ts,.js}"
		)
	],
	cli: {
		migrationDir: path.join(process.env.NODE_ENV !== "production" ? "src" : "dist", "migration")
	}
};
