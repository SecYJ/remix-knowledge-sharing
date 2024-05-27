import { useFetcher } from "@remix-run/react";
import { cn } from "~/utils/cn";

interface Props {
	user: {
		_id: string;
		firstName: string;
		lastName: string;
	};
	index: number;
}

const Item = ({ user, index }: Props) => {
	const fetcher = useFetcher();
	const isDeleting = fetcher.state !== "idle";

	return (
		<li className={cn("flex gap-1", isDeleting ? "text-red-600" : "text-black")} key={user._id}>
			{index + 1}. {user.firstName} {user.lastName}
			<fetcher.Form method="POST" action="?index">
				<input type="hidden" name="delete" value={user._id} />
				<button type="submit" name="_action" value="delete" className="border border-black px-1">
					x
				</button>
			</fetcher.Form>
		</li>
	);
};

export default Item;
