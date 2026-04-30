

declare interface ErrorResponse {
    message: string;
    code: number;
}

declare type SuccessResponse<T> = {
    message: string;
} & T;

declare type APIResponse<T> = SuccessResponse<T> | ErrorResponse;