import { PropsWithChildren } from "react";

interface Props {
	priority: "high" | "low";
}

const Wrapper = ({ priority, children }: PropsWithChildren<Props>) => {
	return (
		<div>
			<div className="text-5xl text-center my-10">
				{priority === "high" ? "Important Content" : "Low Priority Content"}
			</div>
			<ul className="grid grid-cols-2 gap-4">{children}</ul>
		</div>
	);
};

export default Wrapper;
