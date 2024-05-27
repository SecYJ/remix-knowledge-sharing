import { PropsWithChildren } from "react";
import { cn } from "~/utils/cn";

interface Props {
	variant: "primary" | "secondary";
}

const Button = ({ children, variant }: PropsWithChildren<Props>) => {
	return (
		<button
			type="submit"
			className={cn("rounded py-2 px-4", {
				"bg-gray-300": variant === "primary",
			})}
		>
			{children}
		</button>
	);
};

export default Button;
