import RoleName from "../authorization/role-name";

export default interface JwtPayload {
	name: string;
	sub: number;
	roles: RoleName[];
}
