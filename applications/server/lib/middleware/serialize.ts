import compose from "koa-compose";
import { filter, finalize } from "koa-logic";
import { camelCase, snakeCase } from "koa-change-case";
import { query, request, response } from "koa-position";
import bodyParser from "koa-bodyparser";
import convert, { jsonlize } from "koa-serialize";

import { isRequestType, isResponseType } from "../expression";
import { Middleware } from "../type";

const json = "application/json";

function serialize(): Middleware {
  return compose([
    finalize(
      filter(
        isResponseType(json),
        compose([
          convert(response("body"), (value) => jsonlize(value)),
          snakeCase(response("body")),
        ])
      )
    ),
    bodyParser(),
    camelCase(query()),
    filter(isRequestType(json), camelCase(request("body"))),
  ]);
}

export default serialize;
