import { SetMetadata, CustomDecorator } from "@nestjs/common";
import RoleName from "../role-name";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Roles = (...roles: RoleName[]): CustomDecorator<string> => SetMetadata("roles", roles);
export default Roles;
