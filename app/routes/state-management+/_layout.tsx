import { Link, Outlet } from "@remix-run/react";

const StateManagementLayout = () => {
	return (
		<div className="grid grid-cols-[4fr_8fr] min-h-screen">
			{/* NOTE: sidebar */}
			<ul className="grid place-items-center bg-[whitesmoke]">
				<li>
					<Link to="/search-param">URL Search Param</Link>
				</li>
			</ul>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default StateManagementLayout;
