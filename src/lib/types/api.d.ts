

declare interface ErrorResponse {
    message: string;
    code: number;
    errors?: Array<{
        path: string;
        message: string[];
    }>
}

declare type SuccessResponse<T> = {
    message: string;
} & T;

declare type APIResponse<T> = SuccessResponse<T> | ErrorResponse;