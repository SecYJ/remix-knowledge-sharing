import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { userSchema } from "~/lib/validate";
import { cn } from "~/utils/cn";
import { createUser, deleteUser, getUsers } from "./misc/queries";
import Input from "./ui/Input";

export const loader = async () => {
	const data = await getUsers();
	return json(data);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const action = formData.get("_action");

	if (action === "delete") {
		await deleteUser(formData.get("userId") as string);
		return null;
	}

	const submission = parseWithZod(formData, { schema: userSchema });

	if (submission.status !== "success") {
		return json({ status: submission.status, errors: submission.error }, { status: 404 });
	}

	if (action === "add") {
		await createUser(formData.get("username") as string, request.signal);
	}

	return json({
		status: "success",
	} as const);
};

export default function Base() {
	const data = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const [form, fields] = useForm({
		defaultNoValidate: false,
		constraint: getZodConstraint(userSchema),
		lastResult: actionData?.status === "error" ? actionData.errors : undefined,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: userSchema });
		},
	});
	const navigation = useNavigation();
	const isSubmitting = navigation.state !== "idle" && navigation.formData?.get("_action") === "add";

	return (
		<>
			<ol className="p-10 space-y-2">
				{data.map((user, index) => (
					<li className={cn("flex gap-1")} key={user._id}>
						<p>
							{index + 1}. {user.username}
						</p>

						<Form method="POST">
							<input type="hidden" name="userId" value={user._id} />

							<button type="submit" name="_action" value="delete" className="border border-black px-1">
								x
							</button>
						</Form>
					</li>
				))}
			</ol>
			<Form method="POST" {...getFormProps(form)} className="flex pl-10 items-start gap-3 mt-3">
				<Input
					placeholder="Username"
					{...getInputProps(fields.username, { type: "text" })}
					errorMsg={fields.username?.errors?.[0]}
				/>

				<button
					type="submit"
					name="_action"
					value="add"
					className="border border-black p-1 disabled:bg-zinc-300 rounded"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Adding..." : "Add user"}
				</button>
			</Form>
		</>
	);
}
