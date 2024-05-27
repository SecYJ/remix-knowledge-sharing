import { json, useLoaderData } from "@remix-run/react";
import { getMovies } from "./queries";
import MovieItem from "./ui/MovieItem";

export const loader = async () => {
	const data = await getMovies();

	return json({
		title: "Streaming",
		data,
	});
};

const StreamingPage = () => {
	const { title, data } = useLoaderData<typeof loader>();

	return (
		<div className="container mx-auto">
			<div className="text-5xl text-center my-10">{title}</div>
			<ul className="grid grid-cols-3 gap-4">
				{data.results.map((movie) => (
					<MovieItem key={movie.id} movie={movie} />
				))}
			</ul>
		</div>
	);
};

export default StreamingPage;
