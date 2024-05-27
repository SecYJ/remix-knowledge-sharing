import { isRouteErrorResponse, useParams, useRouteError } from "@remix-run/react";
import GeneralErrorBoundary from "~/ui/GeneralErrorBoundary";

export const loader = async () => {
	// throw new Response("Song Not Found 😢", { status: 404 });
	return null;
};

const PlayListPage = () => {
	const { songId } = useParams();

	return <div className="text-white grid place-items-center">play list here {songId}</div>;
};

export const ErrorBoundary = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return <GeneralErrorBoundary error="routeError" errorMsg="Song Not Found!" />;
	}

	return <GeneralErrorBoundary error="unknownError" />;
};

export default PlayListPage;
