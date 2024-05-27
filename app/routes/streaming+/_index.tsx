import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getMovies } from "./queries";
import MovieItem from "./ui/MovieItem";
import Skeleton from "./ui/Skeleton";

export const loader = async () => {
	const data = getMovies();

	return defer({
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
				<Suspense fallback={<Skeleton count={20} />}>
					<Await resolve={data}>
						{(movies) => movies.results.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
					</Await>
				</Suspense>
			</ul>
		</div>
	);
};

export default StreamingPage;
