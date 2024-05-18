import { z } from "zod";

export const required = (value: string) => value.length > 0;

export const min = (value: string, min: number) => value.length >= min;

export const schema = z.object({
	firstName: z
		.string({
			required_error: "First name is required",
		})
		.min(3, {
			message: "First name min length is 3",
		})
		.max(20, {
			message: "First name max length is 20",
		}),
	lastName: z
		.string({
			required_error: "Last name is required",
		})
		.min(3, {
			message: "Last name min length is 3",
		})
		.max(20, {
			message: "Last name max length is 20",
		}),
});
