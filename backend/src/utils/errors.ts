export class AppError extends Error {
	public readonly statusCode: number;
	public readonly details?: unknown;

	constructor(message: string, statusCode = 400, details?: unknown) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
}

export class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}

export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(message, 403);
	}
}

export class ConflictError extends AppError {
	constructor(message = "Conflict") {
		super(message, 409);
	}
}

export class ValidationAppError extends AppError {
	public readonly errors: Record<string, string[]>;

	constructor(errors: Record<string, string[]>, message = "Validation failed") {
		super(message, 422, errors);
		this.errors = errors;
	}
}
