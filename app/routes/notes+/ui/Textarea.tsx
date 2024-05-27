import { ComponentProps } from "react";

type Props = { errorMsg?: string } & ComponentProps<"textarea">;

const Textarea = (props: Props) => {
	return (
		<div>
			<textarea {...props} className="size-full bg-[#FFFAE6] resize-none " rows={10} />
			<p className="text-red-600">{props.errorMsg}</p>
		</div>
	);
};

export default Textarea;
