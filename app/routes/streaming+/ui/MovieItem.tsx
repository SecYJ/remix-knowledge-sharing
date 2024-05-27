interface Props {
	movie: {
		id: number;
		poster_path: string;
		title: string;
	};
}

const MovieItem = ({ movie }: Props) => {
	return (
		<li key={movie.id}>
			<img
				src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
				className="max-w-[500px] max-h-[400px] size-full object-cover"
				alt={movie.title}
			/>
		</li>
	);
};

export default MovieItem;
