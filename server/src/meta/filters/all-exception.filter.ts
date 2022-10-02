import { ServerResponse, IncomingMessage } from "http";
import {
	Catch,
	ExceptionFilter,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger
} from "@nestjs/common";
import { Response, Request } from "express";
import ExceptionResponse from "../responses/exception.response";

/**
 * This filter only exists as a workaround for: https://github.com/nestjs/serve-static/issues/139.
 */
@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
	private static readonly logger = new Logger(AllExceptionFilter.name);

	// eslint-disable-next-line class-methods-use-this
	public catch(exception: HttpException & { code: string }, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request & IncomingMessage>();
		const response = ctx.getResponse<Response<ExceptionResponse> & ServerResponse>();

		if (exception.code === "ENOENT") {
			response
				.status(HttpStatus.NOT_FOUND)
				.json({ statusCode: HttpStatus.NOT_FOUND, message: `Resource not found: ${request.path}` });
		}

		response
			.json({ statusCode: exception.getStatus(), message: exception.message })
			.status(exception.getStatus());
	}
}
