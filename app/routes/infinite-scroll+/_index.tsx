import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import Spinner from "~/assets/spinner.svg?react";
import { getInfiniteList } from "./queries";
import { useInfiniteMovie } from "./useInfiniteMovie";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const query = new URL(request.url).searchParams.get("page");

	const data = await getInfiniteList(query ? Number(query) : 1);

	console.log("data here", data);

	return json({
		title: "Infinite Scroll Example",
		moviesList: data.results,
	});
};

const InfiniteScrollExample = () => {
	const data = useLoaderData<typeof loader>();
	const { ref, movies, fetcher } = useInfiniteMovie(data.moviesList);

	return (
		<>
			<div className="fixed right-10 top-1/2 -translate-y-1/2 text-2xl">
				<div>
					<p>Current page: </p>
					<p>{movies.length / 20}</p>
				</div>
				<div>
					<p>Total page: </p>
					{/* <p>{data.total_pages}</p> */}
				</div>
			</div>
			<div className="flex gap-3 justify-center border-b border-black">
				<h1 className="text-4xl text-center capitalize">{data.title}</h1>
			</div>
			<div className="pl-2">
				<ul className="space-y-2">
					{movies.map((movie, index) => (
						<li key={`${movie.id}${index}`} className="text-3xl">
							{movie.title}
						</li>
					))}
				</ul>
				{fetcher.state !== "idle" && <Spinner className="size-24 my-4" />}
				<div ref={ref} />
			</div>
		</>
	);
};

export default InfiniteScrollExample;
