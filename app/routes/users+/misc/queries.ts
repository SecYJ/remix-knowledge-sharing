import { axiosInstance } from "~/models/axios";
import { User, UserResponse } from "./type";

export const deleteUser = async (id: string) => {
	await axiosInstance.delete(`/notes/${id}`);
};

export const createUser = async (username: string, signal?: AbortSignal) => {
	await axiosInstance.post(
		"/notes",
		{
			username,
		},
		{ signal }
	);
};

export const getUsers = async () => {
	const data = await axiosInstance.get<UserResponse<User[]>>("/notes");
	return data.data.data;
};

export const getUser = async (id: string) => {
	const data = await axiosInstance.get<UserResponse<User>>(`/notes/${id}`);
	return data.data.data;
};

export const updateUser = (note: { id: string; firstName: string; lastName: string }) => {
	return axiosInstance.put(`/notes/${note.id}`, {
		firstName: note.firstName,
		lastName: note.lastName,
	});
};
