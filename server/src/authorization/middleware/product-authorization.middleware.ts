import { IncomingMessage, ServerResponse } from "http";
import { Injectable, NestMiddleware, Logger, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";
import { getConnection } from "typeorm";
import UserRepository from "../../user/user.repository";
import JwtPayload from "../../authentication/jwt-payload";

@Injectable()
export default class ProductAuthorizationMiddleware
	implements NestMiddleware<IncomingMessage & Request, ServerResponse & Response>
{
	private static readonly logger = new Logger(ProductAuthorizationMiddleware.name);

	public constructor(private readonly jwtService: JwtService) {}

	public async use(
		req: IncomingMessage & Request,
		res: ServerResponse & Response,
		next: NextFunction
	): Promise<void> {
		const userRepository = getConnection().getCustomRepository(UserRepository);

		try {
			// TODO: Need to actually authenticate properly
			const jwtPayload = await this.jwtService.verifyAsync<JwtPayload>(req.cookies.jwt);
			const user = await userRepository.findOne(jwtPayload.sub);
			if (user === undefined) {
				throw new UnauthorizedException("Unauthorized user");
			}
		} catch (e) {
			throw new UnauthorizedException("Malformed JWT");
		}

		next();
	}
}
