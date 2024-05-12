import { Link, Outlet, json, useLoaderData } from "@remix-run/react";

export const loader = async () => {
	return json({
		songs: [
			{
				name: "I dont wanna live forever",
			},
			{
				name: "Blank Space",
			},
			{
				name: "Cruel Summer",
			},
			{
				name: "Shake It Off",
			},
			{
				name: "Love Story",
			},
		],
	});
};

const SongPage = () => {
	const { songs } = useLoaderData<typeof loader>();

	return (
		<>
			<ul className="text-white text-center place-content-center gap-2 grid">
				{songs.map((song) => (
					<li key={song.name}>
						<Link to="i-dont-wanna-live-forever">{song.name}</Link>
					</li>
				))}
			</ul>
			<Outlet />
		</>
	);
};

export default SongPage;
