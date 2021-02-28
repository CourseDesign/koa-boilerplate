import { Request as DefaultRequest } from "koa";

type Request<T = unknown> = DefaultRequest & { body: T };

export default Request;
