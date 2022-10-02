import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { User } from "../user/user.entity";
import UserRepository from "../user/user.repository";
import JwtPayload from "./jwt-payload";

@Injectable()
export default class AuthenticationService {
	public constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository
	) {}

	public createJwt(user: User): Promise<string> {
		return this.jwtService.signAsync({
			name: user.email,
			sub: user.id,
			roles: user.roles.map((role) => role.name)
		} as JwtPayload);
	}

	public validateUser(email: string, hashedPassword: string): Promise<User | undefined> {
		return this.userRepository.findOne({
			where: { email, hashedPassword },
			relations: ["roles"]
		});
	}
}
