import { ComponentProps } from "react";

type Props = {
	errorMsg?: string;
} & ComponentProps<"input">;

const Input = (props: Props) => {
	return (
		<div>
			<input type="text" {...props} className="bg-[#FFFAE6] p-1.5 w-full" />
			{props.errorMsg && <p className="text-red-600">{props.errorMsg}</p>}
		</div>
	);
};

export default Input;
