import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createNote } from "./misc/queries";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { noteSchema } from "./misc/validate";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const submission = parseWithZod(formData, { schema: noteSchema });

	if (submission.status !== "success") {
		return json({ success: false, errors: submission.error } as const, {
			status: 401,
		});
	}

	const { title, content } = submission.value;

	await createNote(title, content);

	return redirect("/notes");
};

const NewNotePage = () => {
	const actionData = useActionData<typeof action>();
	const [form, fields] = useForm({
		lastResult: actionData?.errors,
		defaultNoValidate: false,
		constraint: getZodConstraint(noteSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: noteSchema });
		},
	});

	return (
		<Form method="POST" {...getFormProps(form)} className="p-4 space-y-4">
			<Input
				placeholder="title"
				{...getInputProps(fields.title, {
					type: "text",
				})}
				errorMsg={fields.title.errors?.[0]}
			/>
			<Textarea
				placeholder="content"
				{...getInputProps(fields.content, {
					type: "text",
				})}
				errorMsg={fields.content.errors?.[0]}
			/>

			<div className="flex justify-end">
				<Button variant="primary">Submit</Button>
			</div>
		</Form>
	);
};

export default NewNotePage;
