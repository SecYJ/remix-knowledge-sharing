import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { deleteNote, getNote } from "./misc/queries";
import Button from "./ui/Button";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const noteId = params.noteId;
	const data = await getNote(noteId as string);

	return data;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const noteId = formData.get("noteId");
	await deleteNote(noteId as string);

	return redirect("/notes");
};

const NotePage = () => {
	const data = useLoaderData<typeof loader>();
	const navigation = useNavigation();
	const isDeleting = navigation.state !== "idle";

	return (
		<div>
			<p>
				{data.firstName} {data.lastName}
			</p>
			<Form method="POST" className="space-x-4">
				<input type="hidden" name="noteId" value={data._id} />
				<Button variant="primary">{isDeleting ? "Deleting..." : "Delete"}</Button>
				<Link to="edit" className="rounded py-2 px-4 mt-3 inline-block bg-gray-300">
					Edit
				</Link>
			</Form>
		</div>
	);
};

export default NotePage;
