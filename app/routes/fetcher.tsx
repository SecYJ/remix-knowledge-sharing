import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import Item from "~/ui/item";
import { createNote, deleteNote, getNotes } from "./notes+/misc/queries";
import Input from "./notes+/ui/Input";

export const loader = async () => {
	const data = await getNotes();
	return json(data);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();

	const action = formData.get("_action");

	if (action === "delete") {
		const userId = formData.get("delete");
		await deleteNote(String(userId));
		return null;
	}

	const firstName = formData.get("firstName");
	const lastName = formData.get("lastName");

	await createNote(firstName as string, lastName as string);

	return null;
};

export default function Index() {
	const data = useLoaderData<typeof loader>();
	const navigation = useNavigation();

	return (
		<div className="p-10">
			<ol className="pl-4 space-y-2">
				{data.map((user, index) => (
					<Item key={user._id} user={user} index={index} />
				))}
			</ol>
			<Form method="POST" action="?index" className="flex gap-3 mt-3">
				<Input placeholder="First Name" name="firstName" />
				<Input placeholder="Last Name" name="lastName" />

				<button type="submit" name="_action" value="add" className="border border-black p-1 rounded">
					{navigation.state !== "idle" ? "Adding..." : "Add user"}
				</button>
			</Form>
		</div>
	);
}
