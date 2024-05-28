export interface User {
	username: string;
	_id: string;
}

export interface UserResponse<T> {
	data: T;
}
