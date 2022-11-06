import { EntityManager, Repository } from "typeorm";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Permission } from "./permission.entity";
import PermissionName from "./permission-name";

type PermissionCache = {
	[r in PermissionName]?: Permission;
};

@Injectable()
export default class PermissionRepository extends Repository<Permission> implements OnModuleInit {
	private static readonly logger = new Logger(PermissionRepository.name);
	private static permissionCache: PermissionCache;

	constructor(entityManager: EntityManager) {
		super(Permission, entityManager);
	}

	public onModuleInit(): void {
		this.invalidatePermissionCache();
	}

	public async invalidatePermissionCache(): Promise<void> {
		PermissionRepository.permissionCache = {};

		const permissions = await this.find();
		for (const permission of permissions) {
			switch (permission.name) {
				case PermissionName.READ_SELF:
					PermissionRepository.permissionCache.READ_SELF = permission;
					break;
				case PermissionName.READ_OTHERS:
					PermissionRepository.permissionCache.READ_OTHERS = permission;
					break;
				case PermissionName.UPDATE_SELF:
					PermissionRepository.permissionCache.READ_SELF = permission;
					break;
				case PermissionName.UPDATE_OTHERS:
					PermissionRepository.permissionCache.READ_OTHERS = permission;
					break;
				case PermissionName.DELETE_SELF:
					PermissionRepository.permissionCache.READ_SELF = permission;
					break;
				case PermissionName.DELETE_OTHERS:
					PermissionRepository.permissionCache.READ_OTHERS = permission;
					break;
				default:
					PermissionRepository.logger.error(`Unknown role name: ${permission.name}`);
			}
		}
	}

	public async getPermissionCache(): Promise<PermissionCache> {
		if (PermissionRepository.permissionCache !== undefined) {
			return PermissionRepository.permissionCache;
		}

		await this.invalidatePermissionCache();

		return PermissionRepository.permissionCache;
	}
}
