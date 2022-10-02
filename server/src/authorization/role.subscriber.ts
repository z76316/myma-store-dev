import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { Role } from "./role.entity";
import RoleRepository from "./role.repository";

@EventSubscriber()
export default class RoleSubscriber implements EntitySubscriberInterface<Role> {
	// eslint-disable-next-line class-methods-use-this
	public listenTo(): string {
		return Role.name;
	}

	// eslint-disable-next-line class-methods-use-this
	public afterUpdate(event: UpdateEvent<Role>): void {
		const roleRepository = event.connection.getCustomRepository(RoleRepository);
		roleRepository.invalidateRoleCache();
	}
}
