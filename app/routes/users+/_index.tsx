import { ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
	}

	if (action === "add") {
		await createUser(formData.get("username") as string);
	}

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
							{index + 1}. {user.username}
						</p>

						<form method="POST">
							<input type="hidden" name="userId" value={user._id} />

							<button type="submit" name="_action" value="delete" className="border border-black px-1">
								x
							</button>
						</form>
					</li>
				))}
			</ol>
			<form method="POST" action="?index" className="flex pl-10 gap-3 mt-3">
				<Input placeholder="Username" name="username" />

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
