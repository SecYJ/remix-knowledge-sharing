import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { APIResponse } from "./type";

type TMovies = APIResponse["results"];

export const useInfiniteMovie = (defaultData: TMovies) => {
	const [ref, entry] = useIntersectionObserver();
	const fetcher = useFetcher<APIResponse>();
	const [movieData, setMovieData] = useState<TMovies[]>([defaultData]);
	const movies = movieData.flat();

	useEffect(() => {
		if (entry?.isIntersecting && fetcher.state === "idle") {
			fetcher.load(`?page=${movieData.length + 1}`);
		}
	}, [entry?.isIntersecting]);

	useEffect(() => {
		if (fetcher.data) {
			const newItems = fetcher.data.results;
			setMovieData((prev) => [...prev, newItems]);
		}
	}, [fetcher.data]);

	return { ref, movies, fetcher };
};
