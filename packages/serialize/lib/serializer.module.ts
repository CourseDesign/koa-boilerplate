import { SimpleModule } from "@cheeket/koa";
import { Container, inContainerScope } from "cheeket";
import { Type } from "@course-design/types";

import { serializerManagerProvider } from "./provider";
import SerializeTokens from "./serialize.tokens";
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
import Serializer from "./serializer/serializer";

class SerializerModule extends SimpleModule {
  private readonly serializers = new Map<
    Type<unknown>,
    (manager: SerializerManager) => Serializer<unknown>
  >();

  private readonly dynamicSerializers = new Map<
    (value: unknown) => boolean,
    (manager: SerializerManager) => Serializer<unknown>
  >();

  private readonly serializerManagerProvider = inContainerScope(
    serializerManagerProvider()
  );

  constructor(options?: { registerDefault?: boolean }) {
    super();

    const registerDefault = options?.registerDefault ?? true;
    if (registerDefault) {
      this.registerDefault();
    }
  }

  bind<T>(
    type: Type<T>,
    serializer: (manager: SerializerManager) => Serializer<T>
  ): SerializerModule {
    this.serializers.set(type, serializer);
    return this;
  }

  dynamicBind<T>(
    selector: (value: unknown) => boolean,
    serializer: (manager: SerializerManager) => Serializer<T>
  ): SerializerModule {
    this.dynamicSerializers.set(selector, serializer);
    return this;
  }

  registerDefault(): void {
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

    this.bind(Date, dateSerializer);
    this.bind(Set, setSerializer);
    this.bind(Map, mapSerializer);

    this.bind(Array, arraySerializer);

    this.dynamicBind(this.typeMatch("boolean"), passSerializer);
    this.dynamicBind(this.typeMatch("number"), passSerializer);
    this.dynamicBind(this.typeMatch("string"), passSerializer);
    this.dynamicBind(this.typeMatch("undefined"), passSerializer);
    this.dynamicBind(this.typeMatch("symbol"), notPassSerializer);
    this.dynamicBind(this.typeMatch("function"), notPassSerializer);
    this.dynamicBind(this.typeMatch("bigint"), notPassSerializer);
    this.dynamicBind(this.typeMatch("object"), objectSerializer);
  }

  configureRoot(container: Container): void {
    container.bind(
      SerializeTokens.SerializerManager,
      this.serializerManagerProvider.bind()
    );

    const listener = async (value: unknown, done: () => void) => {
      if (value instanceof SerializerManager) {
        Array.from(this.serializers.entries()).forEach(([type, provider]) => {
          const serializer = provider(value);
          value.bind(type, serializer);
        });
        Array.from(this.dynamicSerializers.entries()).forEach(
          ([type, provider]) => {
            const serializer = provider(value);
            value.dynamicBind(type, serializer);
          }
        );

        container.removeListener("create:async", listener);
      }

      done();
    };

    container.on("create:async", listener);
  }

  // eslint-disable-next-line class-methods-use-this
  private typeMatch(
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
}

export default SerializerModule;
