import { SimpleModule } from "@cheeket/koa";
import { Container, inContainerScope } from "cheeket";
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

class SerializerModule extends SimpleModule {
  private readonly serializerManagerProvider = inContainerScope(
    serializerManagerProvider()
  );

  configureRoot(container: Container): void {
    container.bind(
      SerializeTokens.SerializerManager,
      this.serializerManagerProvider.bind()
    );

    const listener = async (value: unknown, done: () => void) => {
      if (value instanceof SerializerManager) {
        const passSerializer = new PassSerializer();
        const notPassSerializer = new NotPassSerializer();
        const dateSerializer = new DateSerializer();
        const objectSerializer = new ObjectSerializer(value);
        const arraySerializer = new ArraySerializer(value);
        const setSerializer = new SetSerializer(value);
        const mapSerializer = new MapSerializer(value);

        value.bind(Date, dateSerializer);
        value.bind(Set, setSerializer);
        value.bind(Map, mapSerializer);

        value.bind(Array, arraySerializer);

        value.dynamicBind(this.typeMatch("boolean"), passSerializer);
        value.dynamicBind(this.typeMatch("number"), passSerializer);
        value.dynamicBind(this.typeMatch("string"), passSerializer);
        value.dynamicBind(this.typeMatch("undefined"), passSerializer);
        value.dynamicBind(this.typeMatch("symbol"), notPassSerializer);
        value.dynamicBind(this.typeMatch("function"), notPassSerializer);
        value.dynamicBind(this.typeMatch("bigint"), notPassSerializer);
        value.dynamicBind(this.typeMatch("object"), objectSerializer);

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
