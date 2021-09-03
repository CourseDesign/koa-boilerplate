import Application, { DefaultState } from "koa";
import compose from "koa-compose";
import { filter, finalize } from "koa-logic";
import { query, response } from "koa-position";
import { snakeCase } from "koa-change-case";
import expose from "koa-expose";
import koaSerialize, { Serializer } from "koa-serialize";
import { install } from "@cheeket/koa";

import { isResponseType } from "@internal/koa-expression";

import SerializerModule, { SerializerModuleConfig } from "./serializer.module";
import SerializeTokens from "./serialize.tokens";
import SerializeContext from "./serialize.context";
import registerDefaultSerializer from "./register-default-serializer";

const isResponseTypeJson = isResponseType("application/json");

export type SerializeOption = {
  register?: SerializerModuleConfig["register"];
};
function serialize(
  option?: SerializeOption
): Application.Middleware<DefaultState, SerializeContext> {
  const module = new SerializerModule({
    register: option?.register ?? registerDefaultSerializer,
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const serializer: Serializer = async (value, context) => {
    const serializerManager = await context.resolve(
      SerializeTokens.SerializerManager
    );
    return serializerManager.serialize(value);
  };

  return compose([
    install(module),
    finalize(
      filter(
        isResponseTypeJson,
        compose([
          koaSerialize(response("body"), serializer),
          snakeCase(response("body")),
          expose(query("fields")),
        ])
      )
    ),
  ]);
}

export default serialize;
