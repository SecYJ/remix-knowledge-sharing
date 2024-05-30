import { Outlet } from "@remix-run/react";

const StreamingLayout = () => {
	return (
		<div className="px-4 grid gap-4 grid-cols-2">
			<Outlet />
		</div>
	);
};

export default StreamingLayout;
