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
import {
  ArraySerializer,
  DateSerializer,
  MapSerializer,
  NotPassSerializer,
  ObjectSerializer,
  PassSerializer,
  SerializerManager,
  SetSerializer,
} from "./serializer";

const isResponseTypeJson = isResponseType("application/json");

function typeMatch(
  type:
    | "undefined"
    | "object"
    | "boolean"
    | "number"
    | "bigint"
    | "string"
    | "symbol"
    | "function"
): (value: unknown) => boolean {
  return (value) => typeof value === type;
}

const defaultRegister: SerializerModuleConfig["register"] = (
  serializerModule
) => {
  const passSerializer = () => new PassSerializer();
  const notPassSerializer = () => new NotPassSerializer();
  const dateSerializer = () => new DateSerializer();
  const objectSerializer = (manger: SerializerManager) =>
    new ObjectSerializer(manger);
  const arraySerializer = (manger: SerializerManager) =>
    new ArraySerializer(manger);
  const setSerializer = (manger: SerializerManager) =>
    new SetSerializer(manger);
  const mapSerializer = (manger: SerializerManager) =>
    new MapSerializer(manger);

  serializerModule.bind(Date, dateSerializer);
  serializerModule.bind(Set, setSerializer);
  serializerModule.bind(Map, mapSerializer);

  serializerModule.bind(Array, arraySerializer);

  serializerModule.dynamicBind(typeMatch("boolean"), passSerializer);
  serializerModule.dynamicBind(typeMatch("number"), passSerializer);
  serializerModule.dynamicBind(typeMatch("string"), passSerializer);
  serializerModule.dynamicBind(typeMatch("undefined"), passSerializer);
  serializerModule.dynamicBind(typeMatch("symbol"), notPassSerializer);
  serializerModule.dynamicBind(typeMatch("function"), notPassSerializer);
  serializerModule.dynamicBind(typeMatch("bigint"), notPassSerializer);
  serializerModule.dynamicBind(typeMatch("object"), objectSerializer);
};

export type SerializeOption = {
  register?: SerializerModuleConfig["register"];
};
function serialize(
  option?: SerializeOption
): Application.Middleware<DefaultState, SerializeContext> {
  const module = new SerializerModule({
    register: option?.register ?? defaultRegister,
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
