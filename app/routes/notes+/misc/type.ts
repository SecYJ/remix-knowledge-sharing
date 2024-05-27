export interface Note {
	firstName: string;
	lastName: string;
	_id: string;
}

export interface TodoResponse<T> {
	data: T;
}
