import { SimpleModule } from "@cheeket/koa";
import { Container, inContainerScope } from "cheeket";
import {
  arraySerializerProvider,
  dateSerializerProvider,
  mapSerializerProvider,
  notPassSerializerProvider,
  objectSerializerProvider,
  passSerializerProvider,
  serializerManagerProvider,
  setSerializerProvider,
} from "./provider";
import SerializeTokens from "./serialize.tokens";
import { SerializerManager } from "./serializer";

class SerializerModule extends SimpleModule {
  private readonly serializerManagerProvider = inContainerScope(
    serializerManagerProvider()
  );

  private readonly passSerializerProvider = inContainerScope(
    passSerializerProvider()
  );

  private readonly notPassSerializerProvider = inContainerScope(
    notPassSerializerProvider()
  );

  private readonly dateSerializerProvider = inContainerScope(
    dateSerializerProvider()
  );

  private readonly objectSerializerProvider = inContainerScope(
    objectSerializerProvider(SerializeTokens.SerializerManager)
  );

  private readonly arraySerializerProvider = inContainerScope(
    arraySerializerProvider(SerializeTokens.SerializerManager)
  );

  private readonly setSerializerProvider = inContainerScope(
    setSerializerProvider(SerializeTokens.SerializerManager)
  );

  private readonly mapSerializerProvider = inContainerScope(
    mapSerializerProvider(SerializeTokens.SerializerManager)
  );

  configureRoot(container: Container): void {
    container.bind(
      SerializeTokens.SerializerManager,
      this.serializerManagerProvider.bind()
    );
    container.bind(
      SerializeTokens.PassSerializer,
      this.passSerializerProvider.bind()
    );
    container.bind(
      SerializeTokens.NotPassSerializer,
      this.notPassSerializerProvider.bind()
    );
    container.bind(
      SerializeTokens.DateSerializer,
      this.dateSerializerProvider.bind()
    );
    container.bind(
      SerializeTokens.ObjectSerializer,
      this.objectSerializerProvider.bind()
    );
    container.bind(
      SerializeTokens.ArraySerializer,
      this.arraySerializerProvider.bind()
    );
    container.bind(
      SerializeTokens.SetSerializer,
      this.setSerializerProvider.bind()
    );
    container.bind(
      SerializeTokens.MapSerializer,
      this.mapSerializerProvider.bind()
    );

    const listener = async (value: unknown, done: () => void) => {
      if (value instanceof SerializerManager) {
        const passSerializer = await container.resolve(
          SerializeTokens.PassSerializer
        );
        const notPassSerializer = await container.resolve(
          SerializeTokens.NotPassSerializer
        );
        const dateSerializer = await container.resolve(
          SerializeTokens.DateSerializer
        );
        const objectSerializer = await container.resolve(
          SerializeTokens.ObjectSerializer
        );
        const arraySerializer = await container.resolve(
          SerializeTokens.ArraySerializer
        );
        const setSerializer = await container.resolve(
          SerializeTokens.SetSerializer
        );
        const mapSerializer = await container.resolve(
          SerializeTokens.MapSerializer
        );

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
