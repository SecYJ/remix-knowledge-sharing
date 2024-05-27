import { axiosInstance } from "~/models/axios";
import { Note, TodoResponse } from "./type";

export const deleteUser = async (id: string) => {
	await axiosInstance.delete(`/notes/${id}`);
};

export const createUser = async (
	{ firstName, lastName }: { firstName: string; lastName: string },
	signal?: AbortSignal
) => {
	await axiosInstance.post(
		"/notes",
		{
			firstName,
			lastName,
		},
		{ signal }
	);
};

export const getUsers = async () => {
	const data = await axiosInstance.get<TodoResponse<Note[]>>("/notes");
	return data.data.data;
};

export const getUser = async (id: string) => {
	const data = await axiosInstance.get<TodoResponse<Note>>(`/notes/${id}`);
	return data.data.data;
};

export const updateUser = (note: { id: string; firstName: string; lastName: string }) => {
	return axiosInstance.put(`/notes/${note.id}`, {
		firstName: note.firstName,
		lastName: note.lastName,
	});
};
