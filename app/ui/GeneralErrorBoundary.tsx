import { Link } from "@remix-run/react";

type Props = { restoreLink?: string; restoreName?: string } & (
	| {
			error: "routeError";
			errorMsg: string;
	  }
	| { error: "unknownError" }
);

const GeneralErrorBoundary = (props: Props) => {
	return (
		<div className="h-full grid place-content-center text-center bg-red-600">
			<div className="text-5xl">😎</div>
			{props.error === "routeError" && <div className="font-bold text-3xl text-white">{props.errorMsg}</div>}

			{props.error === "unknownError" && (
				<>
					<div className="font-bold text-3xl text-white">Something went wrong!</div>
					<p className="text-zinc-100">We are already working on fixing it</p>
				</>
			)}

			<Link to={props.restoreLink ?? "/"} className="py-2 px-4 rounded bg-white">
				{props.restoreName}
			</Link>
		</div>
	);
};

export default GeneralErrorBoundary;
