import { ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { min, required } from "~/validation/validate";

const url = "http://localhost:3000/todos";

interface Response {
	data: {
		firstName: string;
		lastName: string;
		_id: string;
	}[];
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

	const errors: Record<string, string[]> = {
		firstName: [],
		lastName: [],
	};

	if (intent === "add") {
		// NOTE: firstName validation
		!required(String(firstName)) && errors.firstName.push("First name is required");
		!min(String(firstName), 3) && errors.firstName.push("Min Length is 3 characters long");

		// NOTE: lastName validation
		!required(String(lastName)) && errors.lastName.push("Last name is required");
		!min(String(lastName), 3) && errors.lastName.push("Min Length is 3 characters long");

		if (!Object.values(errors).some((field) => field.length > 0)) {
			await axios.post(url, {
				firstName,
				lastName,
			});

			return null;
		}
	}

	return json(errors);
};

const TodoPage = () => {
	const data = useLoaderData<typeof loader>();
	const errors = useActionData<typeof action>();

	return (
		<div className="p-10">
			<ol className="pl-4 space-y-2">
				{data.map((user, index) => (
					<li className="flex gap-1" key={user._id}>
						{index + 1}. {user.firstName} {user.lastName}
						<form method="POST">
							<input type="hidden" name="id" value={user._id} />
							<button type="submit" name="_action" value="delete" className="border border-black px-1">
								x
							</button>
						</form>
					</li>
				))}
			</ol>
			<form method="POST" className="flex gap-3 mt-3 items-start">
				<div>
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						className="border border-black p-1"
						required
						minLength={3}
					/>
					{/* {errors &&
						errors.firstName.length > 0 &&
						errors.firstName.map((error) => (
							<p key={error} className="text-red-600">
								{error}
							</p>
						))} */}
				</div>
				<div>
					<input
						type="text"
						placeholder="Last Name"
						name="lastName"
						className="border border-black p-1"
						required
						minLength={3}
					/>
					{/* {errors &&
						errors.lastName.length > 0 &&
						errors.lastName.map((error) => (
							<p key={error} className="text-red-600">
								{error}
							</p>
						))} */}
				</div>
				<button type="submit" name="_action" value="add" className="border border-black p-1 rounded">
					Add user
				</button>
			</form>
		</div>
	);
};

export default TodoPage;
