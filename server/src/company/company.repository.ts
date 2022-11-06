import { EntityManager, Repository } from "typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { Company } from "./company.entity";

@Injectable()
export default class CompanyRepository extends Repository<Company> {
	private static readonly logger = new Logger(CompanyRepository.name);

	constructor(entityManager: EntityManager) {
		super(Company, entityManager);
	}
}
