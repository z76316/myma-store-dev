import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import AuthenticationProvider from "../authentication.provider";
import { User } from "../../user/user.entity";

@Injectable()
export default class GoogleAuthenticationGuard extends AuthGuard(AuthenticationProvider.GOOGLE) {
	public async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const success = (await super.canActivate(ctx)) as boolean;
		// if (success) {
		// 	await this.logIn(ctx.switchToHttp().getRequest());
		// }

		return success;
	}

	// eslint-disable-next-line class-methods-use-this
	public handleRequest<U extends Partial<User>>(
		err: Error,
		user: U,
		info?: { message: string }
	): U {
		if (err !== undefined && err !== null) {
			throw err;
		}

		if (user === undefined) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
