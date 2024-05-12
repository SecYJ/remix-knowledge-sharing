import { useParams } from "@remix-run/react";
import GeneralErrorBoundary from "~/ui/GeneralErrorBoundary";

export const loader = async () => {
	// throw new Error("lol");
	return null;
};

const PlayListPage = () => {
    throw new Error("lol")
	const { songId } = useParams();

	return <div className="text-white grid place-items-center">play list here {songId}</div>;
};

export const ErrorBoundary = () => {
	return <GeneralErrorBoundary />;
};

export default PlayListPage;
