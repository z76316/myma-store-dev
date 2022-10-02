import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsArray, ArrayUnique, ArrayNotEmpty } from "class-validator";

export default class CreatePayPalTransactionDto {
	@ApiProperty({ description: "Token ID from Stripe", example: "flkjasdf8929hhfkj" })
	@IsNumber()
	public readonly tokenId: string;

	@ApiProperty({ description: "Products bought by the user", isArray: true })
	@IsArray()
	@ArrayUnique()
	@ArrayNotEmpty()
	public readonly subscriptions: number[];
}
