import { useMatches } from "@remix-run/react";

const TestingPage2 = () => {
	const d = useMatches();
	console.log(d);

	return <div>testing2 page</div>;
};

export default TestingPage2;
