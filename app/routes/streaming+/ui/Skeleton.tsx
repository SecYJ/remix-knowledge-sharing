interface Props {
	count: number;
}

const Skeleton = ({ count }: Props) => {
	return (
		<>
			{Array.from({ length: count }, (_, index) => (
				<li key={index} className="h-[400px] animate-pulse bg-zinc-200" />
			))}
		</>
	);
};

export default Skeleton;
