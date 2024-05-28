import { ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { max, min, required } from "~/lib/validate";
import { cn } from "~/utils/cn";
import { createUser, deleteUser, getUsers } from "./misc/queries";
import { useHydrated } from "./misc/useHydrated";
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

	const errors: string[] = [];
	const username = formData.get("username") as string;

	if (required(username)) {
		errors.push("Username is required");
	}
	if (min(username, 3)) {
		errors.push("Must be at least 3 characters");
	}
	if (max(username, 10)) {
		errors.push("Max 10 characters");
	}
	if (Object.values(errors).some((error) => error.length > 0)) {
		return json(
			{
				status: "failed",
				errors,
			} as const,
			{
				status: 404,
			}
		);
	}

	if (action === "add") {
		await createUser(formData.get("username") as string);
	}

	return json({
		status: "success",
	} as const);
};

export default function Base() {
	const data = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const isHydrated = useHydrated();

	const usernameError = actionData?.status === "failed" ? actionData.errors[0] : undefined;

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
			<form method="POST" noValidate={isHydrated} action="?index" className="flex pl-10 items-start gap-3 mt-3">
				<Input
					placeholder="Username"
					name="username"
					required
					minLength={3}
					maxLength={10}
					errorMsg={usernameError}
				/>

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
