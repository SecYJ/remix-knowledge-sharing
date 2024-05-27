import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, isRouteErrorResponse, json, useLoaderData, useRouteError } from "@remix-run/react";
import GeneralErrorBoundary from "~/ui/GeneralErrorBoundary";
import { alanSongs, taylorSongs } from "./data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	console.log("params", params);
	if (params.artist !== "taylor-swift" && params.artist !== "alan-walker") {
		throw new Error("Invalid artists");
	}

	return json({
		songs: params.artist === "taylor-swift" ? taylorSongs : alanSongs,
	});
};

const SongPage = () => {
	const { songs } = useLoaderData<typeof loader>();

	return (
		<>
			<ul className="text-white text-center place-content-center gap-2 grid">
				{songs.map((song) => (
					<li key={song.name}>
						<Link to={song.name.replaceAll(" ", "-").toLowerCase()}>{song.name}</Link>
					</li>
				))}
			</ul>
			<Outlet />
		</>
	);
};

export const ErrorBoundary = () => {
	const error = useRouteError();
	const routeError = isRouteErrorResponse(error);

	return (
		<div className="col-span-2">
			{routeError && <GeneralErrorBoundary error="routeError" errorMsg="Song Not Found!" />}

			{!routeError && <GeneralErrorBoundary error="unknownError" />}
		</div>
	);
};

export default SongPage;
