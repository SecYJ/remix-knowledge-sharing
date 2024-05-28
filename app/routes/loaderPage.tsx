import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	request.url;
	request.formData;
	request.headers;

	params.id; // /loaderPage/:id

	const data = JSON.stringify({ message: "Hello, World!" });

	return new Response(data, {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
	request.url;
	request.formData;
	request.headers;
	request.signal;

	params.id;

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/intro",
		},
	});
};

export default function LoaderPage() {
	const data = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();

	return (
		<div>
			<p>{data.message}</p>
		</div>
	);
}
