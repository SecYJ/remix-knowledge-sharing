import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import axios from "axios";
import Spinner from "~/assets/spinner.svg?react";
import { schema } from "~/validation/validate";

const url = "http://localhost:3000/todos";

interface Response {
	data: Array<{
		firstName: string;
		lastName: string;
		_id: string;
	}>;
}

export const loader = async () => {
	const data = await axios.get<Response>(url);

	return json(data.data.data);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const firstName = formData.get("firstName");
	const lastName = formData.get("lastName");
	const intent = formData.get("_action");

	if (intent === "delete") {
		const { id } = Object.fromEntries(formData);
		await axios.delete(`${url}/${id}`);

		return null;
	}

	if (intent === "add") {
		const submission = parseWithZod(formData, { schema });

		if (submission.status !== "success") {
			return submission.reply({ resetForm: true });
		}

		await axios.post(url, {
			firstName,
			lastName,
		});

		return null;
	}

	return null;
};

const TodoPage = () => {
	const data = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();

	const isCreatingUser = navigation.state !== "idle" && navigation.formData?.get("_action") === "add";

	const [form, fields] = useForm({
		constraint: getZodConstraint(schema),
		lastResult: actionData,
		shouldValidate: "onSubmit",
		shouldRevalidate: "onInput",
		defaultNoValidate: false,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema });
		},
	});

	return (
		<div className="p-10">
			<ol className="pl-4 space-y-2">
				{data.map((user, index) => (
					<li className="flex gap-1" key={user._id}>
						{index + 1}. {user.firstName} {user.lastName}
						<Form replace method="POST">
							<input type="hidden" name="id" value={user._id} />
							<button type="submit" name="_action" value="delete" className="border border-black px-1">
								x
							</button>
						</Form>
					</li>
				))}
			</ol>
			<Form method="POST" {...getFormProps(form)} className="flex gap-3 mt-3 items-start">
				<div>
					<input
						{...getInputProps(fields.firstName, {
							type: "text",
						})}
						placeholder="First Name"
						className="border border-black p-1"
					/>
					{fields.firstName.errors && <p className="text-red-600">{fields.firstName.errors[0]}</p>}
				</div>
				<div>
					<input
						placeholder="Last Name"
						{...getInputProps(fields.lastName, {
							type: "text",
						})}
						className="border border-black p-1"
					/>
					{fields.lastName.errors && <p className="text-red-600">{fields.lastName.errors[0]}</p>}
				</div>
				<button
					type="submit"
					name="_action"
					value="add"
					className="border border-black p-1 rounded flex gap-2"
					disabled={isCreatingUser}
				>
					{isCreatingUser ? (
						<>
							<Spinner className="size-6" />
							<span>Creating User</span>
						</>
					) : (
						<span>Add user</span>
					)}
				</button>
			</Form>
		</div>
	);
};

export default TodoPage;
