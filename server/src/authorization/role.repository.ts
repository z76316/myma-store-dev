import { Repository, EntityManager } from "typeorm";
import { Logger, OnModuleInit, Injectable } from "@nestjs/common";
import { Role } from "./role.entity";
import RoleName from "./role-name";

type RoleCache = {
	[r in RoleName]?: Role;
};

@Injectable()
export default class RoleRepository extends Repository<Role> implements OnModuleInit {
	private static readonly logger = new Logger(RoleRepository.name);
	private static roleCache: RoleCache | undefined;

	constructor(entityManager: EntityManager) {
		super(Role, entityManager);
	}

	public onModuleInit(): void {
		this.invalidateRoleCache();
	}

	public async invalidateRoleCache(): Promise<void> {
		RoleRepository.roleCache = {};

		const roles = await this.find({ relations: ["permissions"] });
		for (const role of roles) {
			switch (role.name) {
				case RoleName.ADMIN:
					RoleRepository.roleCache.ADMIN = role;
					break;
				case RoleName.USER:
					RoleRepository.roleCache.USER = role;
					break;
				default:
					RoleRepository.logger.error(`Unknown role name: ${role.name}`);
			}
		}
	}

	// eslint-disable-next-line class-methods-use-this
	public async getRoleCache(): Promise<RoleCache> {
		if (RoleRepository.roleCache !== undefined) {
			return RoleRepository.roleCache;
		}

		await this.invalidateRoleCache();

		return RoleRepository.roleCache!;
	}
}
