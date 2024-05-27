import { Link, NavLink, Outlet, json, useLoaderData } from "@remix-run/react";
import { getNotes } from "./misc/queries";
import { cn } from "~/utils/cn";

export const loader = async () => {
	const data = await getNotes();

	return json(data);
};

const TodoLayout = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div className="min-h-screen grid content-center container">
			<Link to="new" prefetch="intent" className="my-4 block">
				Create new note
			</Link>
			<div className="w-full min-h-[450px] grid grid-cols-[4fr_8fr] border border-black">
				<ul className="bg-[#f5f5f5] py-4">
					{data.map((note) => (
						<li key={note._id}>
							<NavLink
								to={note._id}
								className={({ isActive }) =>
									cn("w-full block px-4", isActive && "bg-[#FFA62F] text-white")
								}
							>
								{note.firstName}
							</NavLink>
						</li>
					))}
				</ul>
				<div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default TodoLayout;
