import { Injectable, Logger } from "@nestjs/common";
import RoleRepository from "./role.repository";

@Injectable()
export default class RoleService {
	private static readonly logger = new Logger(RoleService.name);

	public constructor(private readonly roleRepository: RoleRepository) {}
}
