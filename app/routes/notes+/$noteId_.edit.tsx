import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useHydrated } from "./hooks/useHydrated";
import { getNote } from "./misc/queries";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const noteId = params.noteId;

	const note = await getNote(noteId as string);

	return note;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData.entries());
	console.log("data here", data);

	return null;
};

const NoteEditPage = () => {
	const isHydrated = useHydrated();
	const note = useLoaderData<typeof loader>();

	return (
		<form method="POST" noValidate={isHydrated} className="p-4 space-y-4">
			<Input placeholder="title" name="title" defaultValue={note.firstName} />

			{/* {actionData && !actionData?.success && actionData?.errors?.title?.length > 0 && (
        <p className="text-red-600">actionData?.errors.title[0]</p>
    )} */}

			<Textarea placeholder="content" name="content" defaultValue={note.lastName} />
			{/* {!actionData?.success && <p className="text-red-600">actionData?.errors.content[0]</p>} */}
			<div className="flex justify-end">
				<button type="submit" className="rounded py-2 px-4 bg-gray-300">
					submit
				</button>
			</div>
		</form>
	);
};

export default NoteEditPage;
