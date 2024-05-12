import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import axios from "axios";
import TodoItem from "./TodoItem";
import { cn } from "~/utils/cn";
import { useEffect, useRef } from "react";

const url = "http://localhost:3000/todos";
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Response {
	data: {
		firstName: string;
		lastName: string;
		_id: string;
	}[];
}

export const loader = async () => {
	await wait(Math.floor(Math.random() * 2));
	const data = await axios.get<Response>(url);

	return json(data.data.data);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	await wait(Math.floor(Math.random() * 2));
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
	const navigation = useNavigation();
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const formEl = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (navigation.state !== "submitting") return;
		// if (firstNameRef && firstNameRef.current) {

		//     firstNameRef.current.value = "";
		// }

		// if ()
		// lastNameRef?.current?.value = "";
		formEl && formEl.current?.reset();
	}, [navigation.state]);

	return (
		<div className="p-10">
			<ol className="pl-4 space-y-2">
				{data.map((user, index) => (
					// <TodoItem
					// 	key={user._id}
					// 	firstName={user.firstName}
					// 	lastName={user.lastName}
					// 	index={index + 1}
					// 	_id={user._id}
					// />
					<li
						className={cn(
							"flex gap-1",
							navigation?.formData?.get("id") === user._id ? "text-red-600" : "text-black"
						)}
						key={user._id}
					>
						{index + 1}. {user.firstName} {user.lastName}
						<Form method="POST">
							<input type="hidden" name="id" value={user._id} />
							<button type="submit" name="_action" value="delete" className="border border-black px-1">
								x
							</button>
						</Form>
					</li>
				))}
			</ol>
			<Form method="POST" className="flex gap-3 mt-3" ref={formEl}>
				<input
					type="text"
					name="firstName"
					placeholder="First Name"
					className="border border-black p-1"
					ref={firstNameRef}
				/>
				<input
					type="text"
					placeholder="Last Name"
					name="lastName"
					className="border border-black p-1"
					ref={lastNameRef}
				/>
				<button type="submit" name="_action" value="add" className="border border-black p-1 rounded">
					Add user
				</button>
			</Form>
		</div>
	);
};

export default TodoPage;
