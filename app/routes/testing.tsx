import { json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";

interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export const loader = async () => {
	await new Promise((res) => setTimeout(res, 3000));

	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
	const data: Todo = await response.json();

	return json(data);
};

const TestingPage = () => {
	const data = useLoaderData<typeof loader>();
	const navigation = useNavigation();
	console.log("data", data);

	if (navigation.state === "loading") {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Testing Page</h1>
			<p>{data.title}</p>
		</div>
	);
};

export default TestingPage;
