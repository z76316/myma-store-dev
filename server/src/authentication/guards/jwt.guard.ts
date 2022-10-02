import { IncomingMessage } from "http";
import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { User } from "../../user/user.entity";
import AuthenticationProvider from "../authentication.provider";

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard(AuthenticationProvider.JWT) {
	public async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const success = (await super.canActivate(ctx)) as boolean;
		if (success) {
			await this.logIn(ctx.switchToHttp().getRequest<IncomingMessage & Request>());
		}

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
