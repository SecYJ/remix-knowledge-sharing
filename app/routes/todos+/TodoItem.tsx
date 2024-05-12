import { Form } from "@remix-run/react";

interface Props {
	firstName: string;
	lastName: string;
	index: number;
	_id: string;
}

const TodoItem = ({ firstName, lastName, index, _id }: Props) => {
	return (
		<li className="flex gap-1">
			{index}. {firstName} {lastName}
			<Form method="POST">
				<input type="hidden" name="id" value={_id} />
				<button type="submit" name="_action" value="delete" className="border border-black px-1">
					x
				</button>
			</Form>
		</li>
	);
};

export default TodoItem;
