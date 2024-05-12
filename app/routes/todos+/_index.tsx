import { ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";

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
		const testing = await axios.delete(`${url}/${id}`);

		console.log("testing", testing);

		return null;
	}

	await axios.post(url, {
		firstName,
		lastName,
	});

	return null;
};

const TodoPage = () => {
	const data = useLoaderData<typeof loader>();

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
			<form method="POST" className="flex gap-3 mt-3">
				<input
					type="text"
					name="firstName"
					placeholder="First Name"
					className="border border-black p-1"
					required
				/>
				<input
					type="text"
					placeholder="Last Name"
					name="lastName"
					className="border border-black p-1"
					required
				/>
				<button type="submit" name="_action" value="add" className="border border-black p-1 rounded">
					Add user
				</button>
			</form>
		</div>
	);
};

export default TodoPage;
