import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodSchema } from "zod";
import { validationError } from "@/utils/api-response";

type Target = "body" | "query" | "params";

export function validate(schema: ZodSchema, target: Target = "body") {
	return (req: Request, res: Response, next: NextFunction): void => {
		const input = req[target];
		const result = schema.safeParse(input);
		if (!result.success) {
			const errors = flattenZodErrors(result.error);
			validationError(res, errors);
			return;
		}
		// Reassign parsed (coerced) data
		if (target === "body") req.body = result.data;
		else if (target === "query") req.query = result.data as Request["query"];
		else req.params = result.data as Request["params"];
		next();
	};
}

function flattenZodErrors(error: ZodError): Record<string, string[]> {
	const grouped: Record<string, string[]> = {};
	for (const issue of error.errors) {
		const key = issue.path.join(".") || "_";
		if (!grouped[key]) grouped[key] = [];
		grouped[key].push(issue.message);
	}
	return grouped;
}
