import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { describe, beforeAll, it, afterAll } from "@jest/globals";
import axios from "axios";
import AuthenticationModule from "./authentication.module";

describe("User", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AuthenticationModule]
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it("POST /authentication/local/sign-up", async () => {
		axios.post(await app.getUrl(), { name: "Tristan Partin" });
	});

	afterAll(async () => {
		app.close();
	});
});
