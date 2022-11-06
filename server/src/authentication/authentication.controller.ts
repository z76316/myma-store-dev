import { IncomingMessage } from "http";
import {
	Controller,
	Logger,
	UseGuards,
	Get,
	Req,
	Post,
	Query,
	Redirect,
	NotFoundException,
	HttpStatus,
	Put,
	Body,
	ForbiddenException,
	ConflictException
} from "@nestjs/common";
import { SetCookies, CookieSettings } from "@nestjsplus/cookies";
import { AuthGuard } from "@nestjs/passport";
import {
	ApiBearerAuth,
	ApiTags,
	ApiBasicAuth,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiCreatedResponse,
	ApiResponse,
	ApiConflictResponse,
	ApiForbiddenResponse
} from "@nestjs/swagger";
import { Request } from "express";
import { User } from "../user/user.entity";
import MYMAConfigService from "../server-config/myma-config.service";
import EmailService from "../email/email.service";
import UserService from "../user/user.service";
import StaleTemporaryPasswordError from "../user/errors/stale-temporary-password.error";
import TemporaryPasswordNotRequestedError from "../user/errors/temporary-password-not-requested.error";
import EntryNotFoundError from "../meta/errors/entry-not-found.error";
import AuthenticationProvider from "./authentication.provider";
import AuthenticationService from "./authentication.service";
import ResetPasswordDto from "./dto/requests/reset-password.dto";

@ApiTags("authentication")
@Controller("api/authentication")
export default class AuthenticationController {
	private static readonly logger = new Logger(AuthenticationController.name);

	public constructor(
		private readonly authenticationService: AuthenticationService,
		private readonly mymaConfigService: MYMAConfigService,
		private readonly emailService: EmailService,
		private readonly userService: UserService
	) {}

	@Get("google/login")
	@UseGuards(AuthGuard(AuthenticationProvider.GOOGLE))
	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
	public googleLogin(): void {}

	@Get("google/callback")
	@UseGuards(AuthGuard(AuthenticationProvider.GOOGLE))
	@Redirect("http://localhost:3000", 302)
	@SetCookies()
	public async googleLoginCallback(
		@Req() req: IncomingMessage & Request
	): Promise<{ url: string }> {
		console.log("lol1");
		const user = req.user as User;
		if (!user.activatedAccount) {
			await this.emailService.activateAccount(user);
			console.log("lol2");
			return {
				url: `${this.mymaConfigService.mymaStoreDomain}${this.mymaConfigService.mymaActivateAccountRoute}`
			};
		}

		/* eslint-disable @typescript-eslint/ban-ts-comment, require-atomic-updates */
		// @ts-ignore 2551
		req._cookies = [
			{
				name: "jwt",
				value: await this.authenticationService.createJwt(user),
				options: {
					sameSite: "strict",
					httpOnly: false
				}
			}
		] as CookieSettings[];
		/* eslint-enable */

		return {
			url: `${this.mymaConfigService.mymaStoreDomain}${this.mymaConfigService.mymaRootRoute}`
		};
	}

	@Get("jwt/login")
	@ApiBearerAuth()
	@ApiOkResponse({ type: User, description: "Successfully logged the user in" })
	@ApiBadRequestResponse({ description: "Request did not satisfy necessary parameters" })
	@ApiConflictResponse({
		description: "User has not authenticated their account"
	})
	@ApiUnauthorizedResponse({ description: "User with given credentials does not exist" })
	@UseGuards(AuthGuard(AuthenticationProvider.JWT))
	// eslint-disable-next-line class-methods-use-this
	public async jwtLogin(@Req() req: IncomingMessage & Request): Promise<User> {
		const user = req.user as User;
		if (!user.activatedAccount) {
			throw new ConflictException("User has not activated the account");
		}

		return user;
	}

	@ApiBasicAuth()
	@ApiCreatedResponse({ type: User, description: "Successfully logged the user in" })
	@ApiBadRequestResponse({ description: "Request did not satisfy necessary parameters" })
	@Post("local/sign-up")
	@UseGuards(AuthGuard(AuthenticationProvider.LOCAL))
	public async localSignUp(@Req() req: IncomingMessage & Request): Promise<void> {
		const user = req.user as User;
		// This shouldn't be necessary but why not check for it anyway
		if (!user.activatedAccount) {
			return this.emailService.activateAccount(user);
		}
	}

	@ApiBasicAuth()
	@ApiOkResponse({ type: User, description: "Successfully logged the user in" })
	@ApiBadRequestResponse({ description: "Request did not satisfy necessary parameters" })
	@ApiResponse({
		status: HttpStatus.EXPECTATION_FAILED,
		description: "User has not authenticated their account yet"
	})
	@ApiUnauthorizedResponse({ description: "User with given credentials does not exist" })
	@Post("local/login")
	@UseGuards(AuthGuard(AuthenticationProvider.LOCAL))
	@SetCookies()
	public async localLogin(@Req() req: IncomingMessage & Request): Promise<User> {
		const user = req.user as User;
		if (!user.activatedAccount) {
			throw new ConflictException("User has not activated the account");
		}

		/* eslint-disable  @typescript-eslint/ban-ts-comment, require-atomic-updates */
		// @ts-ignore 2551
		req._cookies = [
			{
				name: "jwt",
				value: await this.authenticationService.createJwt(user),
				options: {
					sameSite: "strict",
					httpOnly: false
				}
			}
		] as CookieSettings[];
		/* eslint-enable */
		return user;
	}

	@ApiOkResponse({
		description: "Sent an email to the specified address with a temporary password"
	})
	@ApiBadRequestResponse({ description: "Request did not satisfy necessary parameters" })
	@ApiNotFoundResponse({ description: "User with supplied email does not exist" })
	@ApiInternalServerErrorResponse({ description: "Unable to send email to the specifed address" })
	@Get("reset-password")
	public async requestPasswordReset(@Query("email") email: string): Promise<void> {
		return this.emailService.temporaryPassword(email);
	}

	@ApiOkResponse({ description: "Successfully reset the user's password" })
	@ApiNotFoundResponse({
		description: "User with supplied email or temporary password does not exist"
	})
	@ApiConflictResponse({
		description: "The temporary password being used is too old. A new one must be requested."
	})
	@ApiForbiddenResponse({ description: "User ever requested a temporary password" })
	@ApiBadRequestResponse({ description: "Request did not satisfy necessary parametersy" })
	@Put("reset-password")
	public async resetPassword(@Body() payload: ResetPasswordDto): Promise<void> {
		try {
			await this.userService.resetPassword(
				payload.email,
				payload.temporaryPassword,
				payload.hashedPassword
			);
		} catch (err) {
			if (err instanceof EntryNotFoundError) {
				throw new NotFoundException(err.message);
			} else if (err instanceof StaleTemporaryPasswordError) {
				throw new ConflictException(err.message);
			} else if (err instanceof TemporaryPasswordNotRequestedError) {
				throw new ForbiddenException(err.message);
			} else {
				AuthenticationController.logger.warn("Unknown error type", err);
				throw err;
			}
		}
	}

	@ApiOkResponse({ description: "The user's account has been activated" })
	@ApiNotFoundResponse({ description: "The activation code does not exist" })
	@Get("activate")
	public async activate(@Query("activationCode") activationCode: string): Promise<void> {
		const user = await this.userService.activateAccount(activationCode);
		if (user === null) {
			throw new NotFoundException("The provided activation code is not correct");
		}
	}
}
