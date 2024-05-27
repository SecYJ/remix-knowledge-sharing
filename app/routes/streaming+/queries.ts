import axios from "axios";

export const baseURL = "https://api.themoviedb.org/3";

export const infinite = axios.create({
	baseURL,
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjEzOTA4NTQxNzZjMjRkYjM3NTNjMTUxMjU5Njk1NyIsInN1YiI6IjY2M2U0NTkzZjhiZDU3OThjZGZmYTk2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_Ukod2LCZrSyy8XadmJEVnqn9uj6hnkoudtiuv_vS8",
	},
});

export interface MovieApiResponse {
	page: number;
	total_pages: number;
	results: {
		title: string;
		id: number;
		poster_path: string;
		backdrop_path: string;
	}[];
}

export const getMovies = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const data = await infinite.get<MovieApiResponse>("/trending/movie/day", {
		params: {
			page: 1,
		},
	});

	return data.data;
};
