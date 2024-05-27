import { infiniteInstance } from "~/models/infinite-scroll";
import { APIResponse } from "./type";

export const getInfiniteList = async (page: number) => {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	const data = await infiniteInstance.get<APIResponse>("discover/movie", {
		params: {
			page: page ?? 1,
		},
	});

	return data.data;
};
