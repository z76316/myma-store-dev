import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { Permission } from "./permission.entity";
import PermissionRepository from "./permission.repository";

@EventSubscriber()
export default class PermissionSubscriber implements EntitySubscriberInterface<Permission> {
	// eslint-disable-next-line class-methods-use-this
	public listenTo(): string {
		return Permission.name;
	}

	// eslint-disable-next-line class-methods-use-this
	public afterUpdate(event: UpdateEvent<Permission>): void {
		const permissionRepository = event.connection.getCustomRepository(PermissionRepository);
		permissionRepository.invalidatePermissionCache();
	}
}
