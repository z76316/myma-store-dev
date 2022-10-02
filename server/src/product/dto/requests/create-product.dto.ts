import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export default class CreateProductDto {
	@ApiProperty({
		description: "Title of the product",
		example: "Calculus 1"
	})
	@IsString()
	public readonly title: string;

	@ApiProperty({
		description: "Code name of the product",
		example: "MYCalc1"
	})
	@IsString()
	public readonly codeName: string;

	@ApiProperty({
		description: "Tag line for the product",
		example: "Calculus is easy as Pi",
		default: null
	})
	@IsString()
	@IsOptional()
	public readonly tagline?: string;

	@ApiProperty({
		description: "Description of the project",
		example: "Calculus 1 is a great online textbook for learning Calculus 1."
	})
	@IsString()
	public readonly description: string;

	@ApiProperty({
		description: "Start page of the product",
		example: "MContents.html",
		default: null
	})
	@IsString()
	@IsOptional()
	public readonly startPage?: string;
}
