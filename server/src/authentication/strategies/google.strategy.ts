/*import { IncomingMessage } from "http";
import crypto from "crypto";
import { Injectable, Logger, InternalServerErrorException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import {
	Strategy,
	Profile,
	VerifyCallback,
	StrategyOptionsWithRequest
} from "passport-google-oauth20";
import AuthenticationProvider from "../authentication.provider";
import MYMAConfigService from "../../server-config/myma-config.service";
import UserRepository from "../../user/user.repository";
import RoleRepository from "../../authorization/role.repository";

@Injectable()
export default class GoogleStrategy extends PassportStrategy(
	Strategy,
	AuthenticationProvider.GOOGLE
) {
	private static readonly logger = new Logger(GoogleStrategy.name);

	public constructor(
		private readonly userRepository: UserRepository,
		private readonly roleRepository: RoleRepository,
		mymaConfigService: MYMAConfigService
	) {
		super({
			clientID: mymaConfigService.googleOAuthClientId,
			clientSecret: mymaConfigService.googleOAuthClientSecret,
			//callbackURL: `${mymaConfigService.googleOAuthCallback}/api/authentication/google/callback`,
			callbackURL: "http://localhost:3000",
			passReqToCallback: true,
			scope: ["profile", "email"]
		} as StrategyOptionsWithRequest);
	}

	public async validate(
		req: IncomingMessage & Request,
		accessToken: string,
		refreshToken: string | undefined,
		profile: Profile,
		done: VerifyCallback
	): Promise<void> {
		const user =
			(await this.userRepository.findOne({
				where: { email: profile.emails![0].value },
				relations: { roles: true }
			})) ??
			(await this.userRepository.save(
				this.userRepository.create({
					name: profile.displayName,
					email: profile.emails![0].value,
					googleAccessToken: accessToken,
					activationCode: crypto.randomBytes(16).toString("hex"),
					roles: [(await this.roleRepository.getRoleCache()).USER!]
				})
			));

		return done(undefined, user);
	}
}*/
import { IncomingMessage } from "http";
import {
	Strategy,
	Profile,
	VerifyCallback,
	StrategyOptionsWithRequest
} from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import AuthenticationProvider from "../authentication.provider";
import { Injectable, Logger, InternalServerErrorException } from "@nestjs/common";
import MYMAConfigService from "../../server-config/myma-config.service";
import UserRepository from "../../user/user.repository";
import RoleRepository from "../../authorization/role.repository";
import crypto from "crypto";

config();

@Injectable()
export default class GoogleStrategy extends PassportStrategy(
	Strategy,
	AuthenticationProvider.GOOGLE
) {
	private static readonly logger = new Logger(GoogleStrategy.name);
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly roleRepository: RoleRepository,
		mymaConfigService: MYMAConfigService
	) {
		super({
			clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			callbackURL: "http://localhost:8080/api/authentication/google/callback",
			//callbackURL: "http://localhost:3000",
			passReqToCallback: true,
			scope: ["profile", "email"]
		} as StrategyOptionsWithRequest);
	}

	public async validate(
		req: IncomingMessage & Request,
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback
	): Promise<any> {
		const { name, emails, photos } = profile;
		const user = {
			name: profile.displayName,
			email: profile.emails![0].value,
			googleAccessToken: accessToken,
			activationCode: crypto.randomBytes(16).toString("hex")
			//roles: [(await this.roleRepository.getRoleCache()).USER!]
		};
		return done(undefined, user);
	}
}
