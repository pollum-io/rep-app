export type SuccessfulResponse = {
	data: unknown;
	error?: never;
	statusCode?: number;
	message?: string;
	totalPages?: number;
};
export type UnsuccessfulResponse<E> = {
	data?: never;
	error: E;
	statusCode?: number;
};

export type ApiResponse<E = unknown> =
	| SuccessfulResponse
	| UnsuccessfulResponse<E>;
