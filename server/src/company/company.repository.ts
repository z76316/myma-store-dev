import { EntityRepository, Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { Company } from "./company.entity";

@EntityRepository(Company)
export default class CompanyRepository extends Repository<Company> {
	private static readonly logger = new Logger(CompanyRepository.name);
}
