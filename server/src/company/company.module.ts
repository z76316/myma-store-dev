import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CompanyRepository from "./company.repository";
import CompanyController from "./company.controller";
import CompanyService from "./company.service";

@Module({
	imports: [TypeOrmModule.forFeature([CompanyRepository])],
	controllers: [CompanyController],
	providers: [CompanyService],
	exports: [CompanyService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class CompanyModule {}
