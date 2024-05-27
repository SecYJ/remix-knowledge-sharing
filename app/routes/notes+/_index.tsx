import { ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { createNote, deleteNote, getNotes } from "./misc/queries";

export const loader = async () => {
	const data = await getNotes();

	return json(data);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const firstName = formData.get("firstName");
	const lastName = formData.get("lastName");
	const intent = formData.get("_action");

	if (intent === "delete") {
		const { id } = Object.fromEntries(formData);
		await deleteNote(String(id));

		return null;
	}

	await createNote(String(firstName), String(lastName));

	return null;
};

const TodoPage = () => {
	const data = useLoaderData<typeof loader>();
	const navigation = useNavigation();

	return (
		// <div className="p-10">
		// 	<ol className="pl-4 space-y-2">
		// 		{data.map((user, index) => (
		// 			<li
		// 				className={cn(
		// 					"flex gap-1",
		// 					navigation?.formData?.get("id") === user._id ? "text-red-600" : "text-black"
		// 				)}
		// 				key={user._id}
		// 			>
		// 				{index + 1}. {user.firstName} {user.lastName}
		// 				<form method="POST">
		// 					<input type="hidden" name="id" value={user._id} />
		// 					<button type="submit" name="_action" value="delete" className="border border-black px-1">
		// 						x
		// 					</button>
		// 				</form>
		// 			</li>
		// 		))}
		// 	</ol>
		// 	<form method="POST" className="flex gap-3 mt-3">
		// 		<Input placeholder="First Name" name="firstName" />
		// 		<Input placeholder="Last Name" name="lastName" />

		// 		<button type="submit" name="_action" value="add" className="border border-black p-1 rounded">
		// 			Add user
		// 		</button>
		// 	</form>
		// </div>
		<div className="h-full grid place-items-center text-3xl">Select to see your note</div>
	);
};

export default TodoPage;

// notes
// notes/:id
// notes/:id/new
