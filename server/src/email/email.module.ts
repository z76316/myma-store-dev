import { Module } from "@nestjs/common";
import ServerConfigModule from "../server-config/server-config.module";
import UserModule from "../user/user.module";
import EmailService from "./email.service";

@Module({
	imports: [ServerConfigModule, UserModule],
	providers: [EmailService],
	exports: [EmailService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class EmailModule {}
