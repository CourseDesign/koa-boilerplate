import Application from "koa";
import compose from "koa-compose";
import { filter } from "koa-logic";
import { query, response } from "koa-position";
import { snakeCase } from "koa-change-case";
import expose from "koa-expose";
import koaSerialize from "koa-serialize";

import { isResponseType } from "../../expression";
import State from "../../state";
import Context from "../../context";

const isResponseTypeJson = isResponseType("application/json");

function serialize(): Application.Middleware<State, Context> {
  return filter(
    isResponseTypeJson,
    compose([
      koaSerialize(response("body")),
      snakeCase(response("body")),
      expose(query("fields")),
    ])
  );
}

export default serialize;
