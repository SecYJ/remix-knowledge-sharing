import { Link, Outlet } from "@remix-run/react";

const MusicLayout = () => {
	return (
		<div className="min-h-screen grid grid-cols-[3fr_9fr] bg-black ">
			<div className="grid place-items-center bg-[#121212] h-full p-4">
				<ul className="text-white text-2xl grid place-content-center space-y-2 p-8 w-full">
					<li>
						<Link to="english">英文歌</Link>
					</li>
					<li>
						<Link to="chinese">中文歌</Link>
					</li>
				</ul>
			</div>

			<div className="grid-rows-[auto_1fr] grid">
				<Outlet />
			</div>
		</div>
	);
};

export default MusicLayout;
