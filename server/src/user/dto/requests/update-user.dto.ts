import { IsString, IsEmail, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export default class UpdateUserDto {
	@ApiPropertyOptional({ description: "New name", example: "Jane Doe" })
	@IsString()
	@IsOptional()
	public readonly name?: string;

	@ApiPropertyOptional({ description: "New email", example: "my.email@gmail.com" })
	@IsEmail()
	@IsOptional()
	public readonly email?: string;
}
