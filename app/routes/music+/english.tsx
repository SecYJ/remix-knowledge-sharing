import { Link, Outlet, json, useLoaderData } from "@remix-run/react";

export const loader = async () => {
	return json({
		artists: [
			{
				name: "Taylor Swift",
			},
			{
				name: "Alan Walker",
			},
		],
	});
};

const ArtistSelectPage = () => {
	const { artists } = useLoaderData<typeof loader>();

	return (
		<>
			<nav className="py-10 border-b">
				<ul className="text-white grid grid-cols-3 gap-4 *:border *:py-2 *:px-4 *:rounded-full *:text-center">
					{artists.map((artist) => (
						<li key={artist.name}>
							<Link to="taylor-swift" prefetch="intent" className="block">
								{artist.name}
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
