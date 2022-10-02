import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsBase64 } from "class-validator";

export default class ResetPasswordDto {
	@ApiProperty({
		description: "Email of the user",
		example: "me@example.com"
	})
	@IsEmail()
	public readonly email: string;

	@ApiProperty({
		description: "Temporary password assigned to a user",
		example: "123234jfs09"
	})
	@IsString()
	public readonly temporaryPassword: string;

	@ApiProperty({
		description: "New hashed password of the user",
		example: "12u490u12"
	})
	@IsBase64()
	public readonly hashedPassword: string;
}
