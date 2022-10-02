import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import CompanyService from "./company.service";

@ApiTags("companies")
@Controller("api/companies")
export default class CompanyController {
	public constructor(private readonly companyService: CompanyService) {}
}
