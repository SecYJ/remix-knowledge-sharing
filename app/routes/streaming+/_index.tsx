import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getMovies } from "./queries";
import { MovieItem, Skeleton, Wrapper } from "./ui";

export const loader = async () => {
	const lowPriorityContent = getMovies("slow");
	const highPriorityContent = await getMovies();

	return defer({
		highPriorityContent,
		lowPriorityContent,
	});
};

const StreamingPage = () => {
	const { highPriorityContent, lowPriorityContent } = useLoaderData<typeof loader>();

	return (
		<>
			<Wrapper priority="high">
				<Suspense fallback={<Skeleton count={20} />}>
					<Await resolve={highPriorityContent}>
						{(movies) => movies.results.map((movie) => <MovieItem movie={movie} key={movie.id} />)}
					</Await>
				</Suspense>
			</Wrapper>

			<Wrapper priority="low">
				<Suspense fallback={<Skeleton count={20} />}>
					<Await resolve={lowPriorityContent}>
						{(movies) => movies.results.map((movie) => <MovieItem movie={movie} key={movie.id} />)}
					</Await>
				</Suspense>
			</Wrapper>
		</>
	);
};

export default StreamingPage;
