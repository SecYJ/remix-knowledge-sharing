import { ActionFunctionArgs, json } from "@remix-run/node";
import { createNote } from "./misc/queries";
import { minLength, required } from "./misc/validate";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const errors: Record<"title" | "content", string[]> = {
		title: [],
		content: [],
	};

	if (required(String(data.title), "title")) {
		errors.title.push("Title is required");
	}

	if (minLength(String(data.title), "title", 3)) {
		errors.title.push("Title must be at least 3 characters");
	}

	if (required(String(data.content), "content")) {
		errors.content.push("Content is required");
	}

	if (minLength(String(data.content), "content", 3)) {
		errors.content.push("Content must be at least 3 characters");
	}

	if (errors.title.length > 0 || errors.content.length > 0) {
		return json({ success: false, errors } as const, { status: 400 });
	}

	await createNote(String(data.title), String(data.content));

	return json({ success: true } as const);
};

const NewNotePage = () => {
	// const actionData = useActionData<typeof action>();
	// const isHydrated = useHydrated();

	return (
		<form method="POST" className="p-4 space-y-4">
			<Input placeholder="title" name="title" />
			{/* {actionData && !actionData?.success && actionData?.errors?.title?.length > 0 && (
				<p className="text-red-600">actionData?.errors.title[0]</p>
			)} */}

			<Textarea placeholder="content" name="content" />
			{/* {!actionData?.success && <p className="text-red-600">actionData?.errors.content[0]</p>} */}

			<div className="flex justify-end">
				<Button variant="primary">Submit</Button>
			</div>
		</form>
	);
};

export default NewNotePage;
