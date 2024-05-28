import { z } from "zod";

export const required = (value: string) => value === "";

export const min = (value: string, min: number) => value.length < min;

export const max = (value: string, max: number) => value.length > max;

export const userSchema = z.object({
	username: z
		.string({
			required_error: "First Name is required",
		})
		.min(3)
		.max(10),
});
