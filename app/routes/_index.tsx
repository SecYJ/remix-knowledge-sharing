import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { cn } from "~/utils/cn";
import { createUser, deleteUser, getUsers } from "./notes+/misc/queries";
import Input from "./notes+/ui/Input";

export const loader = async () => {
	const data = await getUsers();
	return json(data);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const action = formData.get("_action");

	if (action === "delete") {
		const userId = formData.get("delete") as string;
		await deleteUser(userId);
		return null;
	}

	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;

	await createUser({ firstName, lastName });

	return null;
};

export default function Index() {
	const data = useLoaderData<typeof loader>();
	const navigation = useNavigation();

	return (
		<div className="p-10">
			<ol className="pl-4 space-y-2">
				{data.map((user, index) => (
					<li
						className={cn("flex gap-1", navigation.state !== "idle" ? "text-red-600" : "text-black")}
						key={user._id}
					>
						{index + 1}. {user.firstName} {user.lastName}
						<Form method="POST">
							<input type="hidden" name="delete" value={user._id} />

							<button type="submit" name="_action" value="delete" className="border border-black px-1">
								x
							</button>
						</Form>
					</li>
				))}
			</ol>
			<Form method="POST" className="flex gap-3 mt-3">
				<Input placeholder="First Name" name="firstName" />
				<Input placeholder="Last Name" name="lastName" />

				<button type="submit" name="_action" value="add" className="border border-black p-1 rounded">
					{navigation.state !== "idle" ? "Adding..." : "Add user"}
				</button>
			</Form>
		</div>
	);
}
