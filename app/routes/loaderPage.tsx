import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
			"Set-Cookie": "name=remix; path=/; HttpOnly; SameSite=Strict; Max-Age=31536000; Secure",
		},
	});
};

export default function LoaderPage() {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<p>{data.message}</p>
		</div>
	);
}
