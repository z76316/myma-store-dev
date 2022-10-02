import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext, UnauthorizedException, Logger } from "@nestjs/common";
import AuthenticationProvider from "../authentication.provider";
import { User } from "../../user/user.entity";

@Injectable()
export default class LocalAuthenticationGuard extends AuthGuard(AuthenticationProvider.LOCAL) {
	private static readonly logger = new Logger(LocalAuthenticationGuard.name);

	public async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const success = (await super.canActivate(ctx)) as boolean;

		return success;
	}

	// eslint-disable-next-line class-methods-use-this
	public handleRequest<U extends User>(err: Error, user: U, info?: { message: string }): U {
		if (err !== undefined && err !== null) {
			throw err;
		}

		if (user === undefined) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
