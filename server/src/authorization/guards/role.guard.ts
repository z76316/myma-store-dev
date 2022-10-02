import { IncomingMessage } from "http";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import RoleName from "../role-name";
import JwtPayload from "../../authentication/jwt-payload";

@Injectable()
export default class RoleGuard implements CanActivate {
	public constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService
	) {}

	public canActivate(ctx: ExecutionContext): boolean {
		const request = ctx.switchToHttp().getRequest<IncomingMessage & Request>();
		const roleNames = this.reflector.get<RoleName[]>("roles", ctx.getHandler());

		const jwt = this.jwtService.decode(request.cookies.jwt) as JwtPayload;
		if (jwt === undefined) {
			return false;
		}

		const sharedRoles = roleNames.filter((roleName) => jwt.roles.includes(roleName));

		return sharedRoles.length > 0;
	}
}
