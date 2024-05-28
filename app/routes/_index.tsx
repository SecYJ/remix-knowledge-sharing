import { ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

	await createUser({
		firstName: formData.get("firstName") as string,
		lastName: formData.get("lastName") as string,
	});

	return null;
};

export default function Index() {
	const data = useLoaderData<typeof loader>();

	return (
		<>
			<ol className="p-10 space-y-2">
				{data.map((user, index) => (
					<li className={cn("flex gap-1")} key={user._id}>
						<p>
							{index + 1}. {user.firstName} {user.lastName}
						</p>

						<form method="POST">
							<input type="hidden" name="delete" value={user._id} />

							<button type="submit" name="_action" value="delete" className="border border-black px-1">
								x
							</button>
						</form>
					</li>
				))}
			</ol>
			<form method="POST" action="?index" className="flex pl-10 gap-3 mt-3">
				<Input placeholder="First Name" name="firstName" />
				<Input placeholder="Last Name" name="lastName" />

				<button type="submit" name="_action" value="add" className="border border-black p-1 rounded">
					Add User
				</button>
			</form>
		</>
	);
}

{
	/* <li className={cn("flex gap-1", navigation.state !== "idle" && "text-red-600")} key={user._id}> */
}

// {navigation.state !== "idle" ? "Adding..." : "Add user"}
