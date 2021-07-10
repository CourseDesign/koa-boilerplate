import { SimpleModule } from "@cheeket/koa";
import { Container, inContainerScope } from "cheeket";
import {
  arraySerializerProvider,
  dateSerializerProvider,
  mapSerializerProvider,
  serializerManagerProvider,
  setSerializerProvider,
} from "./provider";
import SerializeTokens from "./serialize.tokens";
import { SerializerManager } from "./serializer";

class SerializerModule extends SimpleModule {
  private readonly serializerManagerProvider = inContainerScope(
    serializerManagerProvider()
  );

  private readonly dateSerializerProvider = inContainerScope(
    dateSerializerProvider()
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
      SerializeTokens.DateSerializer,
      this.dateSerializerProvider.bind()
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
        const dateSerializer = await container.resolve(
          SerializeTokens.DateSerializer
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
        value.bind(Array, arraySerializer);
        value.bind(Set, setSerializer);
        value.bind(Map, mapSerializer);

        container.removeListener("create:async", listener);
      }

      done();
    };

    container.on("create:async", listener);
  }
}

export default SerializerModule;
