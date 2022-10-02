import { Injectable, Logger } from "@nestjs/common";
import PermissionRepository from "./permission.repository";

@Injectable()
export default class PermissionService {
	private static readonly logger = new Logger(PermissionService.name);

	public constructor(private readonly permissionRepository: PermissionRepository) {}
}
