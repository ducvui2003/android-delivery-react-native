import { CustomError } from "./CustomError";

export class AsyncStoreError extends CustomError {
	constructor(message: string) {
		super(message, 500);
	}
}
