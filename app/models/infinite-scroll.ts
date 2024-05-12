import axios from "axios";

export const infiniteInstance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjEzOTA4NTQxNzZjMjRkYjM3NTNjMTUxMjU5Njk1NyIsInN1YiI6IjY2M2U0NTkzZjhiZDU3OThjZGZmYTk2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_Ukod2LCZrSyy8XadmJEVnqn9uj6hnkoudtiuv_vS8",
	},
});
