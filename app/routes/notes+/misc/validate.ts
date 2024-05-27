import { z } from "zod";

export const required = (value: string, name: string) => {
	if (!value) return `${name} is required`;
};

export const minLength = (value: string, name: string, min: number) => {
	if (value.length < min) return `${name} must be at least ${min} characters`;
};

export const noteSchema = z.object({
	title: z
		.string({
			required_error: "Title is required",
		})
		.min(3)
		.max(10),
	content: z
		.string({
			required_error: "Content is required",
		})
		.min(3)
		.max(10),
});
