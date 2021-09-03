import Application, { DefaultState } from "koa";
import compose from "koa-compose";
import { filter } from "koa-logic";
import { query, request } from "koa-position";
import { camelCase } from "koa-change-case";

import { isRequestType } from "@internal/koa-expression";
import SerializeContext from "./serialize.context";

const isRequestTypeJson = isRequestType("application/json");

function deserialize(): Application.Middleware<DefaultState, SerializeContext> {
  return compose([
    camelCase(query()),
    filter(isRequestTypeJson, camelCase(request("body"))),
  ]);
}

export default deserialize;
