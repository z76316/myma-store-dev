import crypto from "crypto";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import RoleRepository from "../authorization/role.repository";
import EntryNotFoundError from "../meta/errors/entry-not-found.error";
import UserRepository from "./user.repository";
import { User } from "./user.entity";
import TemporaryPasswordNotRequestedError from "./errors/temporary-password-not-requested.error";
import StaleTemporaryPasswordError from "./errors/stale-temporary-password.error";

@Injectable()
export default class UserService {
	private static readonly logger = new Logger(UserService.name);

	public constructor(
		private readonly userRepository: UserRepository,
		private readonly roleRepository: RoleRepository
	) {}

	public async activateAccount(activationCode: string): Promise<User | null> {
		const user = await this.userRepository.findOne({ where: { activationCode } });
		if (user === null) {
			return null;
		}

		user.activatedAccount = true;

		return this.userRepository.save(user);
	}

	public async createUserFromLocalStrategy(
		name: string,
		email: string,
		hashedPassword: string
	): Promise<User> {
		return this.userRepository.save(
			this.userRepository.create({
				name,
				email,
				hashedPassword,
				activationCode: crypto.randomBytes(16).toString("hex"),
				roles: [(await this.roleRepository.getRoleCache()).USER!]
			})
		);
	}

	public async createTemporaryPasswordForUser(email: string): Promise<User> {
		const user = await this.userRepository.findOneOrFail({ where: { email } });

		const temporaryPassword = crypto.randomBytes(8).toString("hex");
		user.temporaryPassword = temporaryPassword;
		user.temporaryPasswordRequestedAt = new Date();
		user.requestedTemporaryPassword = true;

		return this.userRepository.save(user);
	}

	public async resetPassword(
		email: string,
		temporaryPassword: string,
		hashedPassword: string
	): Promise<void> {
		const user = await this.userRepository.findOne({ where: { email, temporaryPassword }});
		if (user === null) {
			UserService.logger.debug("No user found");
			throw new EntryNotFoundError();
		}

		if (!user.requestedTemporaryPassword) {
			UserService.logger.debug("User has not requested a temporary password");
			throw new TemporaryPasswordNotRequestedError();
		}

		// 86400000 is the amount of milliseconds in a day.
		if (
			user.temporaryPasswordRequestedAt !== undefined &&
			Math.abs(Date.now() - user.temporaryPasswordRequestedAt.valueOf()) > 86400000
		) {
			UserService.logger.debug("User's temporary password is over a day old");
			throw new StaleTemporaryPasswordError();
		}

		user.hashedPassword = hashedPassword;
		user.temporaryPassword = undefined;
		user.temporaryPasswordRequestedAt = undefined;
		user.requestedTemporaryPassword = false;

		await this.userRepository.save(user);
	}

	/**
	 * Users have 24 hours to activate their accounts. In this case that they
	 * did not activate in time, their account would be deleted, and they would
	 * be expected to recreate their account.
	 */
	@Cron(CronExpression.EVERY_HOUR)
	public async cullUnactivatedAccounts(): Promise<void> {
		UserService.logger.log("Culling unactivated accounts");
		this.userRepository
			.createQueryBuilder("user")
			.delete()
			.where("!user.activated_account")
			.andWhere("TIMESTAMPDIFF(SECOND, CURRENT_TIMESTAMP(), user.created_at) >= 86400")
			.execute()
			.then((res) => UserService.logger.log("Finished culling unactivated accounts"))
			.catch((err) => UserService.logger.error("Failed to cull unaactivated accounts"));
	}
}
