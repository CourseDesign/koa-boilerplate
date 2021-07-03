import Application from "koa";
import compose from "koa-compose";
import { filter } from "koa-logic";
import { query, response } from "koa-position";
import { snakeCase } from "koa-change-case";
import expose from "koa-expose";
import koaSerialize, { SerializeOptions } from "koa-serialize";

import { install } from "@cheeket/koa";
import { isResponseType } from "../../expression";
import State from "../../state";
import Context from "../../context";
import SerializerModule from "./serializer.module";
import SerializeTokens from "./serialize.tokens";

const isResponseTypeJson = isResponseType("application/json");

function serialize(): Application.Middleware<State, Context> {
  const module = new SerializerModule();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const serialize: SerializeOptions<State, Context>["serialize"] = async (
    value,
    context
  ) => {
    const serializerManager = await context.resolve(
      SerializeTokens.SerializerManager
    );
    return serializerManager.serialize(value);
  };

  return compose([
    install(module),
    filter(
      isResponseTypeJson,
      compose([
        koaSerialize(response("body"), {
          serialize,
        }),
        snakeCase(response("body")),
        expose(query("fields")),
      ])
    ),
  ]);
}

export default serialize;
