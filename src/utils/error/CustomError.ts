export class CustomError extends Error {
	public code: number;

	constructor(message: string, code: number) {
		super(message);

		Object.setPrototypeOf(this, CustomError.prototype);

		this.code = code;
		this.name = this.constructor.name;
	}
}
