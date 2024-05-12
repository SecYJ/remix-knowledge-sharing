export interface APIResponse {
	page: number;
	total_pages: number;
	results: {
		title: string;
		id: number;
	}[];
}
