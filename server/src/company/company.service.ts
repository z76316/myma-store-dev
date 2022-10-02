import { Injectable, Logger } from "@nestjs/common";
import CompanyRepository from "./company.repository";

@Injectable()
export default class CompanyService {
	private static readonly logger = new Logger(CompanyService.name);

	public constructor(private readonly companyRepository: CompanyRepository) {}
}
