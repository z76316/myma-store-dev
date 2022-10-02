import { IncomingMessage } from "http";
import {
	Body,
	Controller,
	Post,
	UseGuards,
	Req,
	ClassSerializerInterceptor,
	UseInterceptors
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import AuthenticationProvider from "../authentication/authentication.provider";
import { User } from "../user/user.entity";
import { Transaction } from "./transaction.entity";
import TransactionService from "./transaction.service";
import CreatePayPalTransactionDto from "./dto/requests/create-paypal-transaction.dto";

@ApiTags("transactions")
@Controller("api/transactions")
export default class TransactionController {
	public constructor(private readonly transactionService: TransactionService) {}

	@Post("paypal")
	@ApiBearerAuth()
	@UseGuards(AuthGuard(AuthenticationProvider.JWT))
	@UseInterceptors(ClassSerializerInterceptor)
	public async create(
		@Body() createPayPalTrasactionDto: CreatePayPalTransactionDto,
		@Req() req: IncomingMessage & Request
	): Promise<Transaction> {
		return plainToClass(
			Transaction,
			await this.transactionService.create(createPayPalTrasactionDto, req.user as User)
		);
	}
}
