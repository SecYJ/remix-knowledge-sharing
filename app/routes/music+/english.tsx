import { Link, Outlet, json, useLoaderData } from "@remix-run/react";

export const loader = async () => {
	return json({
		artists: [
			{
				label: "Taylor Swift",
				value: "taylor-swift",
			},
			{
				label: "Alan Walker",
				value: "alan-walker",
			},
		],
	});
};

const ArtistSelectPage = () => {
	const { artists } = useLoaderData<typeof loader>();

	return (
		<>
			<nav className="py-10 border-b">
				<ul className="text-white grid grid-cols-2 gap-4 *:border *:py-2 *:px-4 *:rounded-full *:text-center">
					{artists.map((artist) => (
						<li key={artist.value}>
							<Link to={artist.value} prefetch="intent" className="block">
								{artist.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="grid grid-cols-2">
				<Outlet />
			</div>
		</>
	);
};

export default ArtistSelectPage;
