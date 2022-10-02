import { Injectable, UnauthorizedException, BadRequestException, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, IStrategyOptionsWithRequest } from "passport-local";
import { Request } from "express";
import { User } from "../../user/user.entity";
import AuthenticationService from "../authentication.service";
import UserService from "../../user/user.service";
import AuthenticationProvider from "../authentication.provider";

@Injectable()
export default class LocalStrategy extends PassportStrategy(
	Strategy,
	AuthenticationProvider.LOCAL
) {
	private static readonly logger = new Logger(LocalStrategy.name);

	public constructor(
		private readonly authenticationService: AuthenticationService,
		private readonly userService: UserService
	) {
		super({
			usernameField: "email",
			passwordField: "hashedPassword",
			session: false,
			passReqToCallback: true
		} as IStrategyOptionsWithRequest);
	}

	public async validate(
		req: Request,
		email: string,
		hashedPassword: string,
		done: CallableFunction
	): Promise<User> {
		const name = req.body.name as string | undefined;
		const isNewUser = req.path.endsWith("sign-up");
		if (name !== undefined && !isNewUser) {
			done(new BadRequestException("Name was not specified"), undefined);
		}

		if (isNewUser) {
			try {
				done(
					undefined,
					await this.userService.createUserFromLocalStrategy(name!, email, hashedPassword)
				);
			} catch (e) {
				LocalStrategy.logger.error(e);
				done(new BadRequestException("A user with that email address already exists"), undefined);
			}
		}

		const user = await this.authenticationService.validateUser(email, hashedPassword);
		if (user === undefined) {
			done(new UnauthorizedException("Incorrect password was supplied"), undefined);
		}

		return done(null, user);
	}
}
