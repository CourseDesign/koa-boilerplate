import SerializerModule from "./serializer.module";
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

function registerDefaultSerializer(serializerModule: SerializerModule): void {
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
}

export default registerDefaultSerializer;
