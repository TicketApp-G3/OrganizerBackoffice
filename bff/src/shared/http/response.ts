import { Response as ExpressResponse } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Response<T = any> = ExpressResponse<T>;
