import { CustomError } from "./CustomError";

export class UnAuthorizationError extends CustomError {
	constructor(message: string) {
		super(message, 401);
	}
}
export class ForbiddenError extends CustomError {
	constructor(message: string) {
		super(message, 403);
	}
}
