export type SuccessResponse<TData = unknown> = {
    error: false;
    message: string;
    code: 200 | 201 | 204 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;
    data: TData;
};
export type BasicErrorResponse = {
    error: true;
    message: string;
};

// client error 4xx

export type BadRequestResponse = BasicErrorResponse & {
    code: 400;
    data: null;
};

export type UnauthorizedResponse = BasicErrorResponse & {
    code: 401;
    data: null;
};

export type ForbiddenResponse = BasicErrorResponse & {
    code: 403;
    data: null;
};

export type NotFoundResponse = BasicErrorResponse & {
    code: 404;
    data: null;
};

export type MethodNotAllowedResponse = BasicErrorResponse & {
    code: 405;
    data: null;
};

export type NotAcceptableResponse<Tdata = unknown> = BasicErrorResponse & {
    code: 406;
    data: Tdata;
};

export type RequestTimeoutResponse = BasicErrorResponse & {
    code: 408;
    data: null;
};

export type ConflictResponse = BasicErrorResponse & {
    code: 409;
    data: null;
};

export type UnprocessableEntityResponse<TInput> = BasicErrorResponse & {
    code: 422;
    data: { [K in keyof TInput]: string[] };
};

export type TooManyRequestsResponse = BasicErrorResponse & {
    code: 429;
    data: null;
};

// 5xx

export type InternalServerErrorResponse = BasicErrorResponse & {
    code: 500;
    data: null;
};

export type BadGatewayResponse = BasicErrorResponse & {
    code: 502;
    data: null;
};

export type ServiceUnavailableResponse = BasicErrorResponse & {
    code: 503;
    data: null;
};

export type GatewayTimeoutResponse = BasicErrorResponse & {
    code: 504;
    data: null;
};

export type ErrorResponse<TData = null> =
    | UnprocessableEntityResponse<TData>
    | NotFoundResponse
    | BadRequestResponse
    | UnauthorizedResponse
    | ForbiddenResponse
    | MethodNotAllowedResponse
    | NotAcceptableResponse<TData>
    | RequestTimeoutResponse
    | ConflictResponse
    | TooManyRequestsResponse
    | InternalServerErrorResponse
    | BadGatewayResponse
    | ServiceUnavailableResponse
    | GatewayTimeoutResponse;

export type Response<TData = unknown> = SuccessResponse<TData> | ErrorResponse<TData>;
